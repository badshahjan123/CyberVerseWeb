import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ModernButton } from "../components/ui/modern-button";
import { Shield, Loader2, Check, ArrowRight, Mail, AlertTriangle } from "lucide-react";
import { apiCall } from "../config/api";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const inputRefs = useRef([]);
  
  // Get userId and deviceId from location state
  const { userId, deviceId, email, deviceInfo } = location.state || {};

  useEffect(() => {
    // Redirect if no userId or deviceId
    if (!userId || !deviceId) {
      navigate("/login");
    }
  }, [userId, deviceId, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiCall("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          userId,
          otp: otpString,
          deviceId,
        }),
      });

      // Store token and user data
      localStorage.setItem("token", response.token);
      localStorage.setItem("lastActivity", Date.now().toString());
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setError(error.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");

    try {
      const response = await apiCall("/auth/resend-otp", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });

      setResendCooldown(60); // 60 seconds cooldown
      alert(response.message || "OTP sent successfully!");
    } catch (error) {
      setError(error.message || "Failed to resend OTP.");
    }

    setResendLoading(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700/50">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              Verify Your Device
            </h1>
            <p className="text-slate-400 mb-4">
              We've sent a 6-digit code to your email
            </p>
            {email && (
              <p className="text-sm text-primary-400 font-medium">{email}</p>
            )}
          </div>

          {/* Device Info Alert */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-400 mb-1">
                  New Device Detected
                </p>
                {deviceInfo && (
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>🖥️ Device: {deviceInfo.deviceName}</p>
                    <p>🌐 Browser: {deviceInfo.browser}</p>
                    <p>💻 OS: {deviceInfo.os}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 text-center">
                Enter 6-Digit Code
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                    disabled={loading || success}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 text-center mt-2">
                ⏰ Code expires in 10 minutes
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <p className="text-sm text-emerald-400 text-center">
                  ✅ Device verified successfully! Redirecting...
                </p>
              </div>
            )}

            <ModernButton
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading || success || otp.join("").length !== 6}
              className="w-full"
            >
              {success ? (
                <Check className="h-5 w-5" />
              ) : loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </ModernButton>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400 mb-2">Didn't receive the code?</p>
            {resendCooldown > 0 ? (
              <p className="text-sm text-slate-500">
                Resend available in {resendCooldown}s
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="h-3 w-3" />
                    Resend Code
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Security Info */}
          <div className="mt-8 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
            <p className="text-xs text-slate-400 text-center">
              🔒 <strong>Security Tip:</strong> Never share your OTP with anyone. 
              CyberVerse will never ask for your OTP via phone or email.
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => navigate("/login")}
              className="text-slate-400 hover:text-slate-300 transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;