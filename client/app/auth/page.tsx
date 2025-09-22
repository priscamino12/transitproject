"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotForm from "./components/ForgotForm";
import Transit from "@/public/transit.jpg"
import Image from "next/image";


export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const isRegister = mode === "register";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <motion.div
        key={mode}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative flex w-full max-w-7xl min-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Panneau latéral */}
        <div
          className={`hidden md:flex w-1/2 p-12 text-white transition-all duration-700 ${isRegister ? "order-2 bg-blue-500" : "order-1 bg-blue-500"
            }`}
        >
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="text-5xl font-extrabold mb-6">Primex Logistics</h2>
              <p className="text-lg opacity-90">
                Transit international simplifié. {isRegister ? "Créez un compte" : "Connectez-vous"} pour gérer vos expéditions.
              </p>



              <Image
                src="/transit.jpg"
                alt="Primex Logistics"
                width={2000}          
                height={400}         
                className="mt-10 mx-auto md:mx-0 drop-shadow-lg"
              />

            </div>
            <div className="mt-12 space-y-6">
              {mode !== "login" && (
                <button
                  onClick={() => setMode("login")}
                  className="rounded-full border border-white px-8 py-4 text-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Se connecter
                </button>
              )}
              {mode !== "register" && (
                <button
                  onClick={() => setMode("register")}
                  className="rounded-full border border-white px-8 py-4 text-lg hover:bg-white hover:text-blue-600 transition"
                >
                  S'inscrire
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div
          className={`flex-1 p-12 md:p-20 flex flex-col justify-center transition-all duration-700 ${isRegister ? "order-1" : "order-2"
            }`}
        >
          <AnimatePresence mode="wait">
            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LoginForm onForgot={() => setMode("forgot")} />
                <div className="flex justify-center mt-6 md:hidden">
                  <button
                    onClick={() => setMode("register")}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    S'inscrire
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "register" && (
              <motion.div
                key="register"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <RegisterForm />
                <div className="flex justify-center mt-6 md:hidden">
                  <button
                    onClick={() => setMode("login")}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Se connecter
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "forgot" && (
              <motion.div
                key="forgot"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ForgotForm onBack={() => setMode("login")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
