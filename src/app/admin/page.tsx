"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface QuotaInfo {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastError: string | null;
  lastErrorTime: string | null;
  lastRequestTime: string | null;
}

interface UserRecord {
  id: string;
  fullName: string;
  professionalTitle: string;
  portfolioId: string;
  createdAt: string;
}

interface AdminStats {
  apiKeyConfigured: boolean;
  apiKeyMasked: string;
  quota: QuotaInfo;
  users: UserRecord[];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [newApiKey, setNewApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // ignore
    }
  }, [password]);

  const handleLogin = useCallback(async () => {
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError("Mot de passe incorrect");
        return;
      }
      setIsAuthenticated(true);
      fetchStats();
    } catch {
      setLoginError("Erreur de connexion");
    }
  }, [password, fetchStats]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchStats]);

  const handleSaveApiKey = useCallback(async () => {
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, apiKey: newApiKey }),
      });
      if (res.ok) {
        setSaveMessage("Clé API sauvegardée avec succès !");
        setNewApiKey("");
        setShowApiKeyInput(false);
        fetchStats();
      } else {
        setSaveMessage("Erreur lors de la sauvegarde");
      }
    } catch {
      setSaveMessage("Erreur de connexion");
    }
  }, [password, newApiKey, fetchStats]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-8 shadow-lg"
        >
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 block">🔐</span>
            <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
            <p className="text-sm text-gray-500 mt-1">CV2Portfolio AI</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Mot de passe admin"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-amber-200/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:scale-[1.02] transition-transform"
            >
              Connexion
            </button>
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
          </div>

          <Link
            href="/"
            className="block text-center text-sm text-gray-400 mt-6 hover:text-amber-600 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F0] px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Tableau de bord Admin
            </h1>
            <p className="text-sm text-gray-500">CV2Portfolio AI</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-sm font-medium text-amber-700 bg-white/80 border border-amber-200/50 hover:scale-105 transition-transform"
          >
            ← Accueil
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Requêtes totales</p>
            <p className="text-3xl font-bold text-gray-800">
              {stats?.quota.totalRequests ?? 0}
            </p>
            <div className="flex gap-3 mt-2 text-xs">
              <span className="text-green-600">
                ✓ {stats?.quota.successfulRequests ?? 0} réussies
              </span>
              <span className="text-red-500">
                ✗ {stats?.quota.failedRequests ?? 0} échouées
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Utilisateurs</p>
            <p className="text-3xl font-bold text-gray-800">
              {stats?.users.length ?? 0}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Portfolios générés
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Statut API</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-3 h-3 rounded-full ${
                  stats?.apiKeyConfigured
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              />
              <span className="text-lg font-semibold text-gray-800">
                {stats?.apiKeyConfigured ? "Connecté" : "Non configuré"}
              </span>
            </div>
            {stats?.quota.lastError && (
              <p className="text-xs text-red-500 mt-2 truncate">
                Dernière erreur : {stats.quota.lastError.slice(0, 60)}
              </p>
            )}
          </motion.div>
        </div>

        {/* API Key Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🔑 Clé API Gemini
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Clé actuelle :</span>
              <code className="px-3 py-1 rounded-lg bg-[#FAF6F0] text-sm text-gray-700 font-mono">
                {stats?.apiKeyMasked || "Non définie"}
              </code>
            </div>

            <AnimatePresence>
              {showApiKeyInput ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    placeholder="Collez votre nouvelle clé API"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-amber-200/50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-transform"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => {
                      setShowApiKeyInput(false);
                      setNewApiKey("");
                    }}
                    className="px-4 py-2.5 rounded-xl text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowApiKeyInput(true)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:scale-105 transition-transform"
                >
                  {stats?.apiKeyConfigured ? "Modifier la clé" : "Ajouter une clé"}
                </button>
              )}
            </AnimatePresence>

            {saveMessage && (
              <p
                className={`text-sm ${
                  saveMessage.includes("succès")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {saveMessage}
              </p>
            )}
          </div>
        </motion.div>

        {/* Quota Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📊 Détails du quota
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs text-gray-500">Dernière requête</p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {stats?.quota.lastRequestTime
                  ? new Date(stats.quota.lastRequestTime).toLocaleString("fr-FR")
                  : "Aucune"}
              </p>
            </div>
            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs text-gray-500">Dernière erreur</p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {stats?.quota.lastErrorTime
                  ? new Date(stats.quota.lastErrorTime).toLocaleString("fr-FR")
                  : "Aucune"}
              </p>
              {stats?.quota.lastError && (
                <p className="text-xs text-red-500 mt-1 break-all">
                  {stats.quota.lastError}
                </p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            ℹ️ Les données se réinitialisent au redémarrage du serveur (plan gratuit Render : après 15 min d&apos;inactivité)
          </p>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-200/50 p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            👥 Utilisateurs ({stats?.users.length ?? 0})
          </h2>

          {stats?.users && stats.users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-200/30">
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">
                      Nom
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">
                      Titre
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">
                      Date
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">
                      Portfolio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-amber-100/30 hover:bg-amber-50/50 transition-colors"
                    >
                      <td className="py-3 px-2 font-medium text-gray-800">
                        {user.fullName}
                      </td>
                      <td className="py-3 px-2 text-gray-600">
                        {user.professionalTitle}
                      </td>
                      <td className="py-3 px-2 text-gray-500">
                        {new Date(user.createdAt).toLocaleString("fr-FR")}
                      </td>
                      <td className="py-3 px-2">
                        <Link
                          href={`/portfolio/${user.portfolioId}`}
                          className="text-amber-600 hover:underline"
                        >
                          Voir →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-3xl mb-2 block">📭</span>
              <p className="text-gray-400">Aucun utilisateur pour le moment</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
