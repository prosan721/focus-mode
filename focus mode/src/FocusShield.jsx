import { useState } from "react";

const callData = [
  { id: 1, name: "Rahim Mia", number: "+880 1711-234567", count: 7, time: "2 min ago", avatar: "R" },
  { id: 2, name: "Unknown", number: "+880 1815-987654", count: 3, time: "15 min ago", avatar: "?" },
  { id: 3, name: "Karim Bhai", number: "+880 1912-345678", count: 12, time: "1 hr ago", avatar: "K" },
  { id: 4, name: "Sumaiya", number: "+880 1631-456789", count: 2, time: "3 hr ago", avatar: "S" },
  { id: 5, name: "Abba", number: "+880 1788-567890", count: 5, time: "Yesterday", avatar: "A" },
];

const avatarColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];

export default function FocusShield() {
  const [activeTab, setActiveTab] = useState("focus");
  const [isOn, setIsOn] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    const newStatus = !isOn;
    setIsOn(newStatus);
    
    // Call Android native method
    if (window.AndroidApp) {
      window.AndroidApp.setFocusMode(newStatus);
    }
  };

  const totalBlocked = callData.reduce((a, b) => a + b.count, 0);

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "#0a0a0f",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0px; }

        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px #00ff9520; }
          50% { box-shadow: 0 0 40px #00ff9540; }
        }
        @keyframes glowRed {
          0%, 100% { box-shadow: 0 0 20px #ff4d4d20; }
          50% { box-shadow: 0 0 40px #ff4d4d40; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .toggle-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .toggle-btn:active { transform: scale(0.94); }
        .tab-btn { transition: all 0.2s ease; cursor: pointer; }
        .call-row {
          transition: all 0.2s ease;
          animation: slideUp 0.3s ease both;
        }
        .call-row:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, minHeight: 780, maxHeight: 820,
        background: "#111118",
        borderRadius: 44,
        border: "1.5px solid #2a2a3a",
        boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        position: "relative",
      }}>

        {/* Status bar */}
        <div style={{
          padding: "14px 28px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono'" }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
              {[3,5,7,9].map((h,i) => (
                <div key={i} style={{ width: 3, height: h, background: i < 3 ? "#fff" : "#ffffff40", borderRadius: 1 }} />
              ))}
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.5C9.8 2.5 11.4 3.2 12.6 4.4L14 3C12.4 1.4 10.3 0.5 8 0.5C5.7 0.5 3.6 1.4 2 3L3.4 4.4C4.6 3.2 6.2 2.5 8 2.5Z" fill="white"/>
              <path d="M8 5.5C9 5.5 9.9 5.9 10.6 6.6L12 5.2C10.9 4.1 9.5 3.5 8 3.5C6.5 3.5 5.1 4.1 4 5.2L5.4 6.6C6.1 5.9 7 5.5 8 5.5Z" fill="white"/>
              <circle cx="8" cy="9.5" r="1.5" fill="white"/>
            </svg>
            <div style={{
              width: 25, height: 12, border: "1.5px solid #ffffff60", borderRadius: 3,
              display: "flex", alignItems: "center", padding: "0 2px", gap: 1
            }}>
              <div style={{ flex: 1, height: 7, background: "#fff", borderRadius: 1.5 }} />
              <div style={{ width: 2, height: 5, background: "#ffffff60", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "18px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{
                color: "#fff", fontSize: 26, fontWeight: 700, letterSpacing: -0.5,
              }}>FocusShield</h1>
              <p style={{ color: "#ffffff50", fontSize: 12, marginTop: 2, fontWeight: 400 }}>
                {isOn ? "🟢 Active — calls are being blocked" : "⚪ Inactive — calls are passing through"}
              </p>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: isOn ? "rgba(0,255,149,0.12)" : "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${isOn ? "rgba(0,255,149,0.25)" : "rgba(255,255,255,0.1)"}`,
              transition: "all 0.4s ease",
            }}>
              <span style={{ fontSize: 20 }}>🛡️</span>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ padding: "16px 24px 0" }}>
          <div style={{
            display: "flex", background: "#1a1a24", borderRadius: 14,
            padding: 4, gap: 4,
          }}>
            {[
              { key: "focus", label: "Focus Mode", icon: "🎯" },
              { key: "reminder", label: "Reminder", icon: "🔔" },
            ].map(tab => (
              <button key={tab.key} className="tab-btn" onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, padding: "10px 0", border: "none", cursor: "pointer",
                  borderRadius: 10, fontSize: 13, fontWeight: 600,
                  fontFamily: "'DM Sans'",
                  background: activeTab === tab.key
                    ? isOn ? "linear-gradient(135deg, #00ff95, #00cc77)" : "#2a2a3a"
                    : "transparent",
                  color: activeTab === tab.key
                    ? isOn ? "#000" : "#fff"
                    : "#ffffff45",
                  transition: "all 0.3s ease",
                  boxShadow: activeTab === tab.key && isOn ? "0 4px 12px rgba(0,255,149,0.3)" : "none",
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}>

          {activeTab === "focus" && (
            <div>
              {/* Big toggle */}
              <div style={{
                background: "#16161f",
                borderRadius: 24,
                padding: "32px 0",
                display: "flex", flexDirection: "column", alignItems: "center",
                border: `1px solid ${isOn ? "rgba(0,255,149,0.15)" : "#2a2a3a"}`,
                marginBottom: 20,
                transition: "all 0.4s ease",
                animation: isOn ? "glow 2.5s ease infinite" : "none",
                position: "relative", overflow: "hidden",
              }}>
                {isOn && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at 50% 40%, rgba(0,255,149,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />
                )}

                {/* Pulse rings */}
                {isOn && (
                  <>
                    <div style={{
                      position: "absolute", width: 160, height: 160,
                      borderRadius: "50%", border: "1.5px solid rgba(0,255,149,0.2)",
                      animation: "pulseRing 2s ease infinite",
                      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    }} />
                    <div style={{
                      position: "absolute", width: 200, height: 200,
                      borderRadius: "50%", border: "1px solid rgba(0,255,149,0.1)",
                      animation: "pulseRing 2s ease infinite 0.5s",
                      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    }} />
                  </>
                )}

                <div style={{ position: "relative", marginBottom: 20 }}>
                  <div style={{
                    width: 110, height: 110, borderRadius: "50%",
                    background: isOn
                      ? "linear-gradient(135deg, #00ff95, #00cc77)"
                      : "linear-gradient(135deg, #2a2a3a, #1a1a24)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: isOn
                      ? "0 0 40px rgba(0,255,149,0.4), 0 8px 24px rgba(0,0,0,0.4)"
                      : "0 8px 24px rgba(0,0,0,0.4)",
                    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    cursor: "pointer",
                  }} className="toggle-btn" onClick={handleToggle}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                        stroke={isOn ? "#003322" : "#ffffff30"} strokeWidth="2" strokeLinecap="round"
                        style={{ transition: "all 0.4s ease" }}
                      />
                      <circle cx="12" cy="12" r="4"
                        fill={isOn ? "#003322" : "#ffffff30"}
                        style={{ transition: "all 0.4s ease" }}
                      />
                    </svg>
                  </div>
                </div>

                <p style={{
                  color: isOn ? "#00ff95" : "#ffffff40",
                  fontSize: 20, fontWeight: 700, letterSpacing: -0.3,
                  transition: "all 0.4s ease",
                }}>{isOn ? "FOCUS ON" : "FOCUS OFF"}</p>
                <p style={{
                  color: "#ffffff30", fontSize: 12, marginTop: 6, fontWeight: 400,
                }}>Tap to {isOn ? "deactivate" : "activate"}</p>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Total Blocked", value: totalBlocked, icon: "🚫" },
                  { label: "Unique Callers", value: callData.length, icon: "👤" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    flex: 1, background: "#16161f", borderRadius: 16,
                    padding: "14px 16px",
                    border: "1px solid #2a2a3a",
                  }}>
                    <span style={{ fontSize: 18 }}>{stat.icon}</span>
                    <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 6, fontFamily: "'DM Mono'" }}>
                      {stat.value}
                    </p>
                    <p style={{ color: "#ffffff40", fontSize: 11, marginTop: 2 }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Call history */}
              <div>
                <p style={{ color: "#ffffff60", fontSize: 12, fontWeight: 600, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                  Call History
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {callData.map((call, i) => (
                    <div key={call.id} className="call-row" style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "#16161f", borderRadius: 16, padding: "12px 14px",
                      border: "1px solid #2a2a3a",
                      animationDelay: `${i * 0.05}s`,
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 13,
                        background: avatarColors[i % avatarColors.length] + "22",
                        border: `1.5px solid ${avatarColors[i % avatarColors.length]}44`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: avatarColors[i % avatarColors.length],
                        fontSize: 16, fontWeight: 700, flexShrink: 0,
                      }}>{call.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {call.name}
                        </p>
                        <p style={{ color: "#ffffff40", fontSize: 11, marginTop: 2, fontFamily: "'DM Mono'" }}>
                          {call.number}
                        </p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{
                          background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.25)",
                          borderRadius: 8, padding: "3px 9px", display: "inline-block",
                        }}>
                          <span style={{ color: "#ff6b6b", fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono'" }}>
                            {call.count}x
                          </span>
                        </div>
                        <p style={{ color: "#ffffff30", fontSize: 10, marginTop: 4 }}>{call.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reminder" && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", minHeight: 400, textAlign: "center",
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: 24,
                background: "rgba(255,200,0,0.1)", border: "1px solid rgba(255,200,0,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, marginBottom: 20,
              }}>🔔</div>
              <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Reminder</p>
              <p style={{ color: "#ffffff40", fontSize: 14, lineHeight: 1.6, maxWidth: 220 }}>
                এই section এ কাজ করবো পরে — তুমি features বলো, আমি add করবো!
              </p>
              <div style={{
                marginTop: 24, padding: "10px 20px",
                background: "rgba(255,200,0,0.08)", border: "1px solid rgba(255,200,0,0.15)",
                borderRadius: 12,
              }}>
                <span style={{ color: "#ffcc00", fontSize: 12, fontWeight: 600 }}>🚧 Coming Soon</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom indicator */}
        <div style={{
          padding: "0 0 16px",
          display: "flex", justifyContent: "center",
        }}>
          <div style={{ width: 130, height: 5, background: "#ffffff20", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}
