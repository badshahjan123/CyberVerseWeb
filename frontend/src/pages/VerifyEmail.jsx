import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ModernButton } from "../components/ui/modern-button";
import { Shield, CheckCircle, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import { apiCall } from "../config/api";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
    }
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await apiCall(`/auth/verify-email/${token}`, {
        method: "GET",
      });

      setStatus("success");
      setMessage(response.message || "Email verified successfully!");

      // Store token and redirect to dashboard after 3 seconds
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("lastActivity", Date.now().toString());
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Verification failed. The link may be expired or invalid.");
    }
  };

  const handleResendVerification = async () => {
    const email = prompt("Please enter your email address:");
    if (!email) return;

    setLoading(true);
    try {
      const response = await apiCall("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      alert(response.message || "Verification email sent successfully!");
    } catch (error) {
      alert(error.message || "Failed to resend verification email.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700/50">
          <div className="text-center mb-8">
            {status === "verifying" && (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 animate-pulse">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
                <h1 className="text-2xl font-bold text-slate-100 mb-2">
                  Verifying Your Email
                </h1>
                <p className="text-slate-400">Please wait while we verify your email address...</p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-100 mb-2">
                  Email Verified! 🎉
                </h1>
                <p className="text-slate-400 mb-4">{message}</p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-emerald-400">
                    ✅ Your account is now fully activated!
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Redirecting to dashboard in 3 seconds...
                  </p>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 mb-6">
                  <XCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-100 mb-2">
                  Verification Failed
                </h1>
                <p className="text-slate-400 mb-4">{message}</p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-400">
                    ⚠️ The verification link may have expired or is invalid.
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Verification links expire after 24 hours.
                  </p>
                </div>
              </>
            )}
          </div>

          {status === "success" && (
            <ModernButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </ModernButton>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <ModernButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleResendVerification}
                disabled={loading}
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
          )}

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-400">Need help? </span>
            <Link to="/" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;