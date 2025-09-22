class EmployeController {
  constructor(employeService) {
    this.employeService = employeService;
  }

  // ➤ Créer un employé
  async createEmploye(req, res) {
    try {
      const employe = await this.employeService.createEmploye(req.body);
      return res.status(201).json(employe);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          error: error.errors?.[0]?.message || "Une valeur unique existe déjà.",
        });
      }
      return res.status(500).json({ error: error.message || "Erreur interne." });
    }
  }

  // ➤ Authentification : renvoie le token JWT
  async authentification(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = await this.employeService.authenticate(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message || "Identifiants invalides." });
    }
  }

  // ➤ Mot de passe oublié
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const { token } = await this.employeService.forgotPwd(email);
      return res.status(200).json({
        token,
        message: "Code d'accès temporaire envoyé avec succès.",
      });
    } catch (error) {
      return res.status(400).json({ error: error.message || "Impossible d'envoyer le code." });
    }
  }

  // ➤ Réinitialisation du mot de passe
  async resetPassword(req, res) {
    try {
      const { token, newPassword, email, codeTemp } = req.body;

      if (!token || !newPassword || !email || !codeTemp) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
      }

      await this.employeService.resetPwd(token, newPassword, email, codeTemp);

      return res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
      return res.status(401).json({ error: error.message || "Réinitialisation impossible." });
    }
  }

  // ➤ Récupérer un employé par ID
  async getEmploye(req, res) {
    try {
      const employe = await this.employeService.getEmployeById(req.params.id);
      if (!employe) {
        return res.status(404).json({ error: "Employé non trouvé." });
      }
      return res.status(200).json(employe);
    } catch (error) {
      return res.status(500).json({ error: error.message || "Erreur serveur." });
    }
  }

  // ➤ Récupérer tous les employés
  async getAllEmployes(req, res) {
    try {
      const employes = await this.employeService.getAllEmployes();
      return res.status(200).json(employes);
    } catch (error) {
      return res.status(500).json({ error: error.message || "Erreur serveur." });
    }
  }

  // ➤ Mettre à jour un employé
  async updateEmploye(req, res) {
    try {
      const employe = await this.employeService.updateEmploye(req.params.id, req.body);
      return res.status(200).json(employe);
    } catch (error) {
      return res.status(400).json({ error: error.message || "Mise à jour impossible." });
    }
  }

  // ➤ Supprimer un employé
  async deleteEmploye(req, res) {
    try {
      await this.employeService.deleteEmploye(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message || "Suppression impossible." });
    }
  }
}

module.exports = EmployeController;
