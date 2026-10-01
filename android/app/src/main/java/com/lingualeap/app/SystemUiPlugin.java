package com.lingualeap.app;

import android.view.View;
import android.view.Window;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * 把系统栏（状态栏 / 导航栏 / 刘海）的尺寸暴露给前端。
 *
 * 为什么需要它：Android 15（targetSdk 35）起强制边到边显示，WebView 会绘制到状态栏下方，
 * 而 Android WebView 并不提供 CSS 的 env(safe-area-inset-*)，
 * 因此由原生读出真实 inset，前端写成 CSS 变量给布局使用。
 */
@CapacitorPlugin(name = "SystemUi")
public class SystemUiPlugin extends Plugin {

    /** 记录前端最后一次要求的图标明暗，配置变化后据此重新套用 */
    private boolean lightBackground = true;

    @Override
    protected void handleOnConfigurationChanged(android.content.res.Configuration newConfig) {
        super.handleOnConfigurationChanged(newConfig);
        // 深色/浅色主题由前端决定，系统配置变化（旋转、夜间模式）后需要重新应用
        applyAppearance(lightBackground);
    }

    private void applyAppearance(boolean light) {
        if (getActivity() == null) {
            return;
        }
        getActivity().runOnUiThread(() -> {
            try {
                WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(
                        getActivity().getWindow(), getActivity().getWindow().getDecorView());
                controller.setAppearanceLightStatusBars(light);
                controller.setAppearanceLightNavigationBars(light);
            } catch (Exception ignored) {
                // 忽略个别 ROM 的兼容问题
            }
        });
    }

    @Override
    public void load() {
        // 统一使用「边到边」绘制：Android 15+ 已强制如此，低版本也保持一致，
        // 内容与系统栏的关系完全交由前端的 --safe-* 变量控制。
        if (getActivity() != null) {
            getActivity().runOnUiThread(() -> {
                try {
                    WindowCompat.setDecorFitsSystemWindows(getActivity().getWindow(), false);
                    // 启动图退出、窗口重建等时机系统会按主题默认值重绘系统栏，
                    // 覆盖前端设置过的明暗。监听一次 insets 变化即重新套用，做到自愈。
                    View decor = getActivity().getWindow().getDecorView();
                    ViewCompat.setOnApplyWindowInsetsListener(decor, (view, insets) -> {
                        applyAppearance(lightBackground);
                        return insets;
                    });
                } catch (Exception ignored) {
                    // 个别定制 ROM 可能不支持，忽略即可
                }
            });
        }
    }

    /**
     * 设置状态栏 / 导航栏图标的明暗。
     * lightBackground = true：浅色背景 → 使用深色图标；false：深色背景 → 使用浅色图标。
     */
    @PluginMethod
    public void setAppearance(PluginCall call) {
        if (getActivity() == null) {
            call.reject("Activity 不可用");
            return;
        }
        this.lightBackground = Boolean.TRUE.equals(call.getBoolean("lightBackground", true));
        applyAppearance(this.lightBackground);
        call.resolve();
    }

    @PluginMethod
    public void getInsets(PluginCall call) {
        if (getActivity() == null) {
            call.reject("Activity 不可用");
            return;
        }
        getActivity().runOnUiThread(() -> {
            float density = getContext().getResources().getDisplayMetrics().density;
            if (density <= 0) {
                density = 1f;
            }

            JSObject ret = new JSObject();
            int top = 0;
            int bottom = 0;
            int left = 0;
            int right = 0;

            try {
                Window window = getActivity().getWindow();
                View decor = window.getDecorView();
                WindowInsetsCompat insets = ViewCompat.getRootWindowInsets(decor);
                if (insets != null) {
                    Insets bars = insets.getInsets(
                            WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
                    top = bars.top;
                    bottom = bars.bottom;
                    left = bars.left;
                    right = bars.right;
                }
            } catch (Exception e) {
                // 读不到 inset 时返回 0，前端会退回 CSS 的 env() 兜底值
            }

            ret.put("top", top / density);
            ret.put("bottom", bottom / density);
            ret.put("left", left / density);
            ret.put("right", right / density);
            ret.put("density", density);
            call.resolve(ret);
        });
    }
}
