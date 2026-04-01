package com.focusshield.app

import android.content.Context
import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log

class FocusCallScreeningService : CallScreeningService() {
    
    override fun onScreenCall(callDetails: Call.Details) {
        val prefs = getSharedPreferences("FocusPrefs", Context.MODE_PRIVATE)
        val isFocusModeActive = prefs.getBoolean("isFocusModeActive", false)

        val response = CallResponse.Builder()
        
        if (isFocusModeActive) {
            // Reject the call
            response.setDisallowCall(true)
            response.setRejectCall(true)
            response.setSkipCallLog(false)
            response.setSkipNotification(true)
            Log.d("FocusShield", "Call rejected by Focus Mode")
        } else {
            response.setDisallowCall(false)
            response.setRejectCall(false)
        }
        
        respondToCall(callDetails, response.build())
    }
}
