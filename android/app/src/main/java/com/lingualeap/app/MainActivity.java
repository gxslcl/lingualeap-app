package com.lingualeap.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // 注册自定义原生插件必须在 super.onCreate 之前
        registerPlugin(NativeTtsPlugin.class);
        registerPlugin(SystemUiPlugin.class);
        registerPlugin(FileExportPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
