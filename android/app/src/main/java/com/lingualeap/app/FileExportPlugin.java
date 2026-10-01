package com.lingualeap.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * 导出文本文件（用于「下载导入模板」）。
 *
 * 为什么需要它：WebView 里用 <a download href="blob:"> 下载不会生效，
 * 点按钮没有任何反应。Android 侧改用系统「保存到…」文件选择器（SAF）：
 * 不需要任何存储权限，由用户选择保存位置，原生负责写入内容。
 * 若设备上无法弹出选择器，再退回到写入应用自己的外部目录。
 */
@CapacitorPlugin(name = "FileExport")
public class FileExportPlugin extends Plugin {

    private PluginCall pendingCall;
    private String pendingContent;

    @PluginMethod
    public void saveFile(PluginCall call) {
        String content = call.getString("content");
        String fileName = call.getString("fileName", "lingualeap.txt");
        String mimeType = call.getString("mimeType", "text/plain");

        if (content == null) {
            call.reject("缺少 content");
            return;
        }
        if (pendingCall != null) {
            call.reject("上一次保存尚未结束");
            return;
        }

        pendingCall = call;
        pendingContent = content;

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType);
        intent.putExtra(Intent.EXTRA_TITLE, fileName);

        try {
            startActivityForResult(call, intent, "filePicked");
        } catch (Exception e) {
            pendingCall = null;
            pendingContent = null;
            call.reject("无法打开文件选择器：" + e.getMessage());
        }
    }

    @ActivityCallback
    private void filePicked(PluginCall call, ActivityResult result) {
        PluginCall target = pendingCall;
        String content = pendingContent;
        pendingCall = null;
        pendingContent = null;

        if (target == null) {
            return;
        }
        if (result.getResultCode() != Activity.RESULT_OK
                || result.getData() == null
                || result.getData().getData() == null) {
            target.reject("已取消保存");
            return;
        }

        Uri uri = result.getData().getData();
        try (OutputStream os = getContext().getContentResolver().openOutputStream(uri)) {
            if (os == null) {
                throw new Exception("目标文件无法写入");
            }
            os.write(content.getBytes(StandardCharsets.UTF_8));
            os.flush();
            JSObject ret = new JSObject();
            ret.put("uri", uri.toString());
            target.resolve(ret);
        } catch (Exception e) {
            target.reject("写入失败：" + e.getMessage());
        }
    }

    /** 备用方案：写到应用自己的外部目录（无需权限），返回绝对路径供界面提示 */
    @PluginMethod
    public void saveFileLocal(PluginCall call) {
        String content = call.getString("content");
        String fileName = call.getString("fileName", "lingualeap.txt");
        if (content == null) {
            call.reject("缺少 content");
            return;
        }
        try {
            File dir = getContext().getExternalFilesDir(null);
            if (dir == null) {
                dir = getContext().getFilesDir();
            }
            File target = new File(dir, fileName);
            try (FileOutputStream fos = new FileOutputStream(target)) {
                fos.write(content.getBytes(StandardCharsets.UTF_8));
                fos.flush();
            }
            JSObject ret = new JSObject();
            ret.put("path", target.getAbsolutePath());
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("写入失败：" + e.getMessage());
        }
    }
}
