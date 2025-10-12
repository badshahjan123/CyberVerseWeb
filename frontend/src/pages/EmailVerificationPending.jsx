import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ModernButton } from "../components/ui/modern-button";
import { Mail, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { apiCall } from "../config/api";

const EmailVerificationPending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error

  const handleResendVerification = async () => {
    if (!email) {
      setMessageType("error");
      setMessage("Email address not found. Please register again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await apiCall("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setMessageType("success");
      setMessage(response.message || "Verification email sent successfully!");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Failed to resend verification email.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700/50">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              Check Your Email 📧
            </h1>
            <p className="text-slate-400 mb-4">
              We've sent a verification link to
            </p>
            {email && (
              <p className="text-primary-400 font-medium mb-4">{email}</p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-400 mb-3">
              📝 Next Steps:
            </h3>
            <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
              <li>Open your email inbox</li>
              <li>Look for an email from CyberVerse</li>
              <li>Click the verification link</li>
              <li>You'll be automatically logged in!</li>
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">
              💡 Can't find the email?
            </h3>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email</li>
              <li>• Wait a few minutes for the email to arrive</li>
              <li>• Click "Resend Email" below if needed</li>
            </ul>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`rounded-lg p-3 mb-6 ${
                messageType === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-red-500/10 border border-red-500/20"
              }`}
            >
              <p
                className={`text-sm text-center ${
                  messageType === "success" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {messageType === "success" && "✅ "}
                {messageType === "error" && "⚠️ "}
                {message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <ModernButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleResendVerification}
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Resend Verification Email</span>
                </>
              )}
            </ModernButton>

            <ModernButton
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              <span>Back to Login</span>
            </ModernButton>
          </div>

          {/* Email Expiry Info */}
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-xs text-amber-400 text-center">
              ⏰ Verification link expires in 24 hours
            </p>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">Need help? </span>
            <Link
              to="/"
              className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPending;