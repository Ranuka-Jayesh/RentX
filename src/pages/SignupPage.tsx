import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function getPasswordStrength(password: string): { score: number; level: "weak" | "medium" | "strong" } {
  if (!password.length) return { score: 0, level: "weak" };
  let score = 0;
  if (password.length >= 6) score += 25;
  if (password.length >= 8) score += 15;
  if (password.length >= 12) score += 10;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  if (/\d/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;
  score = Math.min(100, score);
  const level = score <= 33 ? "weak" : score <= 66 ? "medium" : "strong";
  return { score, level };
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const strength = getPasswordStrength(password);
  return (
    <div className="auth-page">
      <div className="auth-page-bg" aria-hidden />

      {/* Brand panel — visible on desktop */}
      <motion.div
        className="auth-panel-brand"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-heading text-4xl font-bold text-foreground tracking-tight mb-6 block">
          Rent<span className="text-primary">X</span>
        </span>
        <h1 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
          Create account
        </h1>
        <p className="text-muted-foreground mt-2 text-[0.9375rem] leading-relaxed max-w-[20rem]">
          Join RentX to browse vehicles and start renting in minutes.
        </p>
      </motion.div>

      {/* Form panel */}
      <motion.div
        className="w-full max-w-[22rem]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* Mobile header */}
        <div className="lg:hidden text-center mb-8">
          <span className="font-heading text-3xl font-bold text-foreground tracking-tight block mb-4">
            Rent<span className="text-primary">X</span>
          </span>
          <h1 className="font-heading text-xl font-semibold text-foreground">Create account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start your journey with RentX</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="auth-form flex flex-col">
          <motion.div variants={container} initial="hidden" animate="show" className="auth-form-fields">
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={item} className="auth-input-group">
                <label htmlFor="signup-first" className="auth-label">
                  First name
                </label>
                <div className="relative">
                  <User className="auth-input-icon" strokeWidth={1.75} />
                  <input
                    id="signup-first"
                    type="text"
                    placeholder="John"
                    autoComplete="given-name"
                    className="auth-input has-icon"
                  />
                </div>
              </motion.div>
              <motion.div variants={item} className="auth-input-group">
                <label htmlFor="signup-last" className="auth-label">
                  Last name
                </label>
                <input
                  id="signup-last"
                  type="text"
                  placeholder="Doe"
                  autoComplete="family-name"
                  className="auth-input"
                />
              </motion.div>
            </div>

            <motion.div variants={item} className="auth-input-group">
              <label htmlFor="signup-email" className="auth-label">
                Email
              </label>
              <div className="relative">
                <Mail className="auth-input-icon" strokeWidth={1.75} />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="auth-input has-icon"
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="auth-input-group">
              <label htmlFor="signup-password" className="auth-label">
                Password
              </label>
              <div className="relative">
                <Lock className="auth-input-icon" strokeWidth={1.75} />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input has-icon has-toggle"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <EyeOff className="w-[1.125rem] h-[1.125rem]" strokeWidth={1.75} />
                  ) : (
                    <Eye className="w-[1.125rem] h-[1.125rem]" strokeWidth={1.75} />
                  )}
                </button>
              </div>
              {password.length > 0 && (
                <div className="auth-password-strength">
                  <div className="auth-password-strength-bar" role="progressbar" aria-valuenow={strength.score} aria-valuemin={0} aria-valuemax={100} aria-label="Password strength">
                    <div
                      className={`auth-password-strength-fill ${strength.level}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                  <p className={`auth-password-strength-label ${strength.level}`}>
                    {strength.level === "weak" && "Weak"}
                    {strength.level === "medium" && "Medium"}
                    {strength.level === "strong" && "Strong"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="auth-form-actions flex items-start gap-3"
            initial="hidden"
            animate="show"
          >
            <label className="auth-checkbox-wrap flex-1">
              <input type="checkbox" className="auth-checkbox mt-0.5" required />
              <span className="auth-checkbox-label">
                I agree to the{" "}
                <Link to="/terms" className="auth-link inline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="auth-link inline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </motion.div>

          <motion.div variants={item} initial="hidden" animate="show" className="auth-form-submit">
            <button type="submit" className="auth-btn-primary">
              Create account
            </button>
          </motion.div>
        </form>

        <p className="auth-form-footer text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
