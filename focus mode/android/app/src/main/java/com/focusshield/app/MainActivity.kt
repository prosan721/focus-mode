package com.focusshield.app

import android.annotation.SuppressLint
import android.app.role.RoleManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        setContentView(webView)

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_NO_CACHE
        }

        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = WebViewClient()

        // Expose an interface to React
        webView.addJavascriptInterface(WebAppInterface(this), "AndroidApp")

        // Load the React app from assets
        webView.loadUrl("file:///android_asset/www/index.html")

        requestCallScreeningRole()
    }

    private fun requestCallScreeningRole() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = getSystemService(Context.ROLE_SERVICE) as RoleManager
            if (!roleManager.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)) {
                val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                startActivityForResult(intent, 1)
            }
        }
    }

    inner class WebAppInterface(private val context: Context) {
        @JavascriptInterface
        fun setFocusMode(isActive: Boolean) {
            val prefs = context.getSharedPreferences("FocusPrefs", Context.MODE_PRIVATE)
            prefs.edit().putBoolean("isFocusModeActive", isActive).apply()
        }
    }
}
