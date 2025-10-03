"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Charger le FormLogin uniquement côté client
const FormLogin = dynamic(() => import("@/components/auth/components/FormLogin"), { ssr: false });

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const isRegister = mode === "register";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative flex w-full max-w-5xl min-h-[80vh] rounded-3xl bg-white shadow-2xl overflow-hidden"
        >
          {/* Panneau latéral */}
          <div className={`hidden md:flex w-1/2 p-12 text-white bg-blue-600 ${isRegister ? "order-2" : "order-1"}`}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-5xl font-bold mb-4">Primex Logistics</h2>
                <p className="text-lg opacity-90 mb-6">
                  {isRegister ? "Créez un compte" : "Connectez-vous"} pour gérer vos expéditions.
                </p>
                <Image
                  src="/transit.jpg"
                  alt="Primex Logistics"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              </div>

              <div className="space-y-4 mt-8">
                {mode !== "login" && (
                  <button
                    onClick={() => setMode("login")}
                    className="w-full border border-white rounded-full px-6 py-3 hover:bg-white hover:text-blue-600 transition font-semibold"
                  >
                    Se connecter
                  </button>
                )}
                {mode !== "register" && (
                  <button
                    onClick={() => setMode("register")}
                    className="w-full border border-white rounded-full px-6 py-3 hover:bg-white hover:text-blue-600 transition font-semibold"
                  >
                    S'inscrire
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className={`flex-1 p-8 md:p-16 flex flex-col justify-center ${isRegister ? "order-1" : "order-2"}`}>
            <AnimatePresence mode="wait">
              {mode === "login" && (
                <motion.div
                  key="login"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  <FormLogin onForgot={() => setMode("forgot")} />
                  <div className="flex justify-center mt-4 md:hidden">
                    <button onClick={() => setMode("register")} className="text-blue-600 font-semibold hover:underline">
                      S'inscrire
                    </button>
                  </div>
                </motion.div>
              )}

              {mode === "forgot" && (
                <motion.div
                  key="forgot"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4">Mot de passe oublié</h2>
                  <p className="mb-6">Saisissez votre adresse e-mail pour réinitialiser votre mot de passe.</p>
                  <button onClick={() => setMode("login")} className="text-blue-600 font-semibold hover:underline">
                    Retour
                  </button>
                </motion.div>
              )}

              {mode === "register" && (
                <motion.div
                  key="register"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
                  <p className="mb-6">Ici votre formulaire d'inscription.</p>
                  <button onClick={() => setMode("login")} className="text-blue-600 font-semibold hover:underline">
                    Déjà un compte ? Connectez-vous
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
