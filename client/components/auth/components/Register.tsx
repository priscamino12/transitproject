"use client";

import { useState, useEffect } from "react";
import { TypeAcces, ModePaiement } from "../types/register";
import {
  getTypesAcces,
  getModesPaiement,
  createEntreprise,
  createAbonnement,
  createPaiement,
  createEmploye,
} from "../services/register.service";

interface RegisterFormProps {
  onSwitch: () => void;
}

export default function RegisterForm({ onSwitch }: RegisterFormProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Étape 1 : Données entreprise
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [adresseEntreprise, setAdresseEntreprise] = useState("");
  const [nif, setNif] = useState("");
  const [statJuridique, setStatJuridique] = useState("");
  const [typeAccesId, setTypeAccesId] = useState<number | "">("");

  // --- Étape 2 : Abonnement
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [montant, setMontant] = useState("");
  const [modePaiementId, setModePaiementId] = useState<number | "">("");

  // --- Étape 3 : Administrateur
  const [nomAdmin, setNomAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // --- Options
  const [typesAcces, setTypesAcces] = useState<TypeAcces[]>([]);
  const [modesPaiement, setModesPaiement] = useState<ModePaiement[]>([]);

  // --- Charger les types et modes au montage
  useEffect(() => {
    (async () => {
      try {
        const [types, modes] = await Promise.all([getTypesAcces(), getModesPaiement()]);
        setTypesAcces(types || []);
        setModesPaiement(modes || []);
      } catch (err) {
        console.error("Erreur récupération options:", err);
        setError("Impossible de charger les options. Veuillez réessayer plus tard.");
      }
    })();
  }, []);

  // --- Étapes navigation
  const handleNext = () => {
    setError(null);
    if (
      (step === 1 && (!nomEntreprise || !nif || !typeAccesId)) ||
      (step === 2 && (!dateDebut || !dateFin || !montant || !modePaiementId))
    ) {
      setError("Veuillez remplir tous les champs requis avant de continuer.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  // --- Soumission finale
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nomAdmin || !emailAdmin || !password || !confirm) {
      setError("Veuillez remplir tous les champs de l'administrateur.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Créer entreprise
      const entreprise = await createEntreprise({
        nomEntreprise,
        adresseEntreprise: adresseEntreprise || undefined,
        nif,
        statJuridique: statJuridique || undefined,
        typeAccesId,
      });

      console.log("Entreprise créée :", entreprise);

      if (!entreprise || !entreprise.idEntreprise) {
        throw new Error("La création d’entreprise a échoué. Vérifie la réponse du serveur.");
      }

      // 2️⃣ Créer abonnement
      const abonnement = await createAbonnement({
        typeAccesId,
        dateDebut,
        dateFin,
        reductionPourcentage: 0,
      });

      // 3️⃣ Créer paiement
      await createPaiement({
        abonnementId: abonnement.idAbonnement,
        entrepriseId: entreprise.idEntreprise,
        modePaiementId,
        montant: parseFloat(montant),
      });

      // 4️⃣ Créer administrateur
      await createEmploye({
        nomEmploye: nomAdmin,
        emailEmploye: emailAdmin,
        motDePasse: password,
        role: "ADMIN",
        idEntreprise: entreprise.idEntreprise,
      });

      onSwitch(); // redirige vers login
    } catch (err: any) {
      console.error("Erreur inscription:", err);
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Inscription Entreprise
      </h2>

      {error && (
        <p className="text-red-500 text-center font-medium bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      {/* --- Étape 1 : ENTREPRISE --- */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nom de l'entreprise</label>
            <input
              type="text"
              value={nomEntreprise}
              onChange={(e) => setNomEntreprise(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Adresse (optionnel)</label>
            <input
              type="text"
              value={adresseEntreprise}
              onChange={(e) => setAdresseEntreprise(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">NIF</label>
            <input
              type="text"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Statut juridique (optionnel)</label>
            <input
              type="text"
              value={statJuridique}
              onChange={(e) => setStatJuridique(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="ex: SARL, SA, EURL..."
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Type d'accès</label>
            <select
              value={typeAccesId}
              onChange={(e) => setTypeAccesId(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionner un type</option>
              {typesAcces.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nom} - {t.prixBase} Ar
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* --- Étape 2 : ABONNEMENT --- */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Date début</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date fin</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Montant</label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mode de paiement</label>
            <select
              value={modePaiementId}
              onChange={(e) => setModePaiementId(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionner</option>
              {modesPaiement.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* --- Étape 3 : ADMIN --- */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nom administrateur</label>
            <input
              type="text"
              value={nomAdmin}
              onChange={(e) => setNomAdmin(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email administrateur</label>
            <input
              type="email"
              value={emailAdmin}
              onChange={(e) => setEmailAdmin(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Confirmer mot de passe</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      )}

      {/* --- Navigation --- */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Précédent
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        )}
      </div>
    </form>
  );
}
