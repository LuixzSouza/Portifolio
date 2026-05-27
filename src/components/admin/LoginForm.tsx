"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff, Shield, AlertCircle, CheckCircle2, Settings, ArrowRight } from "lucide-react";
import { ApiError } from "@/lib/api";
import { BrandMark } from "@/components/layout/BrandMark";
import { useAdmin } from "./AdminProvider";

export function LoginForm() {
  const { user, login, logout } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showLoggedInView, setShowLoggedInView] = useState(false);
  const [validation, setValidation] = useState({
    username: { valid: false, message: "" },
    password: { valid: false, message: "" }
  });

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      setShowLoggedInView(true);
    } else {
      // Restore remembered credentials
      const remembered = localStorage.getItem("admin_remember");
      if (remembered) {
        const { username: savedUsername } = JSON.parse(remembered);
        setUsername(savedUsername);
        setRememberMe(true);
      }
    }
  }, [user]);

  // Real-time validation
  useEffect(() => {
    setValidation({
      username: {
        valid: username.length >= 3,
        message: username.length > 0 && username.length < 3 ? "Mínimo 3 caracteres" : ""
      },
      password: {
        valid: password.length >= 6,
        message: password.length > 0 && password.length < 6 ? "Mínimo 6 caracteres" : ""
      }
    });
  }, [username, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      await login(username, password);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("admin_remember", JSON.stringify({ username }));
      } else {
        localStorage.removeItem("admin_remember");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Falha ao entrar.");
    } finally {
      setBusy(false);
    }
  }

  const isFormValid = validation.username.valid && validation.password.valid;

  const handleLogout = async () => {
    setBusy(true);
    try {
      await logout();
      setShowLoggedInView(false);
    } catch (err) {
      setError("Erro ao fazer logout.");
    } finally {
      setBusy(false);
    }
  };

  // If user is logged in, show welcome screen
  if (showLoggedInView && user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 bg-gradient-to-br from-background via-background to-surface/50">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-foreground/3 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md"
        >
          {/* Welcome Card */}
          <motion.div
            className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface/95 backdrop-blur-xl shadow-2xl"
            layout
          >
            {/* Header */}
            <div className="border-b border-foreground/5 p-8 pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <BrandMark className="text-2xl text-foreground mb-4" />
                <h1 className="font-roobert text-2xl font-semibold text-foreground mb-2">
                  Bem-vindo de volta!
                </h1>
                <p className="text-sm text-muted">
                  Você está logado como <strong className="text-foreground">{user.username}</strong>
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8 pt-6 space-y-6">
              {/* Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-3 rounded-xl bg-green-500/10 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Autenticado com sucesso
                </span>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">
                  Acesso Rápido
                </h3>

                <motion.a
                  href="/admin"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 rounded-xl border border-foreground/15 bg-background p-4 transition-all hover:border-foreground/30 hover:bg-foreground/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Painel Administrativo</div>
                    <div className="text-xs text-muted">Gerenciar todo o conteúdo</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted" />
                </motion.a>

                <motion.a
                  href="/"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 rounded-xl border border-foreground/15 bg-background p-4 transition-all hover:border-foreground/30 hover:bg-foreground/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Ver Site</div>
                    <div className="text-xs text-muted">Visualizar o portfólio público</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted" />
                </motion.a>
              </motion.div>

              {/* Logout Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4 border-t border-foreground/10"
              >
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  disabled={busy}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl border border-red-500/30 bg-red-500/5 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center gap-2">
                    {busy && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-red-600/20 border-t-red-600 rounded-full"
                      />
                    )}
                    {busy ? "Saindo..." : "Encerrar Sessão"}
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-muted/60">
              Sessão segura e protegida
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-gradient-to-br from-background via-background to-surface/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-foreground/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex items-center justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-surface/80 px-3 py-2 backdrop-blur-sm">
            <Shield className="h-4 w-4 text-foreground/60" />
            <span className="text-xs font-medium text-foreground/60">Acesso Seguro</span>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface/95 backdrop-blur-xl shadow-2xl"
          layout
        >
          {/* Header */}
          <div className="border-b border-foreground/5 p-8 pb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <BrandMark className="text-2xl text-foreground mb-4" />
              <h1 className="font-roobert text-2xl font-semibold text-foreground mb-2">
                Painel Administrativo
              </h1>
              <p className="text-sm text-muted">
                Entre com suas credenciais para gerenciar o conteúdo
              </p>
            </motion.div>
          </div>

          {/* Form content */}
          <div className="p-8 pt-6 space-y-6">
            {/* Username field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Usuário
                  </span>
                  {validation.username.valid && username.length > 0 && (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  )}
                </div>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite seu usuário"
                    autoComplete="username"
                    className={`w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted ${
                      validation.username.message
                        ? "border-red-500/30 focus:border-red-500/50"
                        : "border-foreground/15 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {validation.username.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-xs text-red-500"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {validation.username.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </label>
            </motion.div>

            {/* Password field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Senha
                  </span>
                  {validation.password.valid && password.length > 0 && (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  )}
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    className={`w-full rounded-xl border bg-background py-3 pl-10 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-muted ${
                      validation.password.message
                        ? "border-red-500/30 focus:border-red-500/50"
                        : "border-foreground/15 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {validation.password.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-xs text-red-500"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {validation.password.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </label>
            </motion.div>

            {/* Remember me + Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-foreground/20 text-foreground focus:ring-2 focus:ring-foreground/20 bg-background"
                />
                <span className="text-sm text-foreground">Lembrar usuário</span>
              </label>

              <button
                type="button"
                className="text-sm text-muted hover:text-foreground transition-colors"
                onClick={() => alert("Entre em contato com o desenvolvedor para recuperar o acesso.")}
              >
                Esqueci a senha
              </button>
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-500">Erro de autenticação</p>
                      <p className="text-xs text-red-500/80 mt-1">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="submit"
                disabled={busy || !isFormValid}
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  isFormValid && !busy
                    ? "bg-foreground text-background hover:bg-foreground/90 shadow-lg"
                    : "bg-foreground/20 text-foreground/40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {busy && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-background/20 border-t-background rounded-full"
                    />
                  )}
                  {busy ? "Autenticando..." : "Entrar no Painel"}
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.form>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-muted/60">
            Acesso protegido por autenticação segura
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
