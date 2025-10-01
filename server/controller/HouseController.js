const Client = require("../models/Client");
const MAWB = require("../models/MAWB");
const MBL = require("../models/MBL");
const TransAerienne = require("../models/TransAerienne");
const TransMaritime = require("../models/TransMaritime");
const ConteneurReposotory = require("../repository/ConteneurRepository");
const repositoryConteneur = new ConteneurReposotory();
const PDFDocument = require("pdfkit");

class HouseController {
  constructor(HouseService) {
    this.HouseService = HouseService;
  }

  async createHouseTransaction(req, res) {
    try {
      const House = await this.HouseService.createHouseTransaction(req.body);
      if (req.body.conteneur) {
        const conteneur = req.body.conteneur;
        for (const c of conteneur) {
          await repositoryConteneur.create(c);
        }
      }
      res.status(201).json(House);
    } catch (error) {
      console.error("Erreur HAWB:", error); // <-- ajoute cette ligne
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ error: error.errors[0].message });
      } else if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erreur lors de la creation du House" });
      }
    }
  }
  // Exemple avec Sequelize
  async findById(id) {
    return await House.findByPk(id, {
      include: [
        {
          model: MBL,
          attributes: ["numMBL", "dateEmission", "dateArrivePrevue"],
          include: [
            {
              model: TransMaritime,
              attributes: [
                "numIMO",
                "armateur",
                "numIMO",
                "villeChargement",
                "paysChargement",
                "villeDechargement",
                "paysDechargement"
              ]
            }
          ]
        },
        {
          model: MAWB,
          attributes: ["numMAWB", "dateEmission", "dateArrivePrevue"],
          include: [
            {
              model: TransAerienne,
              attributes: [
                "numVol",
                "nomCompagnie",
                "dateChargement",
                "paysChargement",
                "villeChargement",
                "paysDechargement",
                "villeDechargement"],
            }
          ]
        },

        { model: Client, as: "clientExp", attributes: ["nomClient", "adresseClient", "telClient"] },
        { model: Client, as: "clientDest", attributes: ["nomClient", "adresseClient", "telClient"] }
      ]
    });
  }


  async getOneHouseTransaction(req, res) {
    try {
      const HouseTransaction = await this.HouseService.getHouseTransactionById(
        req.params.id
      );
      if (HouseTransaction) {
        res.status(200).json(HouseTransaction);
      } else {
        res.status(404).send("HouseTransaction not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getOneHouseTransactionByNum(req, res) {
    try {

      const HouseTransaction = await this.HouseService.getHouseTransactionByNum(
        req.params.num
      );
      if (HouseTransaction) {
        res.status(200).json(HouseTransaction);
      } else {
        res.status(404).send("HouseTransaction not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAllHouseTransactions(req, res) {
    try {
      const HouseTransactions = await this.HouseService.getAllHouseTransactions();
      res.status(200).json(HouseTransactions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Dans HouseController
  async getAllByMonthHouseTransactions(req, res) {
    try {
      // Récupérer toutes les transactions HBL ou HAWB selon le repository
      const allTransactions = await this.HouseService.getAllHouseTransactions();

      // Préparer un tableau de 12 mois
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      const monthlyData = months.map((m) => {
        const monthTransactions = allTransactions.filter(tx => {
          const date = new Date(tx.dateEmmission || tx.dateEmission);
          return date.getMonth() + 1 === m;
        });

        const count = monthTransactions.length;
        const revenus = monthTransactions.reduce((sum, tx) => sum + (tx.fret || 0) + (tx.assurance || 0) + (tx.autresFrais || 0), 0);

        return { mois: m, count, revenus };
      });

      res.status(200).json(monthlyData);
    } catch (error) {
      console.error("Erreur getAllByMonthHouseTransactions:", error);
      res.status(500).json({ error: "Erreur serveur lors du calcul par mois" });
    }
  }


  async getCountAllOnYearHouseTransactions(req, res) {
    try {
      const HouseTransactions = await this.HouseService.getCountAllOnYearHouseTransactions();
      res.status(200).json(HouseTransactions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getCountAllHouseTransactions(req, res) {
    try {
      const HouseTransactions = await this.HouseService.getCountAllHouseTransactions();
      res.status(200).json(HouseTransactions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAllHouseTransactionsMere(req, res) {
    try {
      const HouseTransactions = await this.HouseService.getAllHouseTransactionsMere(req.params.id);
      res.status(200).json(HouseTransactions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getTotalColisMere(req, res) {
    try {
      const HouseTransactions = await this.HouseService.getTotalColis(req.params.id);
      res.status(200).json(HouseTransactions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async updateHouseTransaction(req, res) {
    try {
      const HouseTransaction = await this.HouseService.updateHouseTransaction(
        req.params.id,
        req.body
      );
      res.status(200).json(HouseTransaction);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        // Gérer l'erreur d'unicité
        res.status(400).json({
          error:
            error.errors[0].message || "Une valeur unique est déjà présente.",
        });
      } else if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        // Erreur interne serveur
        res.status(500).json({ error: "Erreur lors de la creation du House" });
      }
    }
  }
  async deleteHouseTransaction(req, res) {
    try {
      await this.HouseService.deleteHouseTransaction(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async generateInvoice(req, res) {
    try {
      const hbl = await this.HouseService.getHouseTransactionById(req.params.id);
      if (!hbl) {
        return res.status(404).json({ error: "Transaction introuvable" });
      }

      const safeText = (value, fallback = "—") => {
        if (!value) return fallback;
        if (typeof value === "object") {
          return value.nomClient || value.nom || value.numVol || value.numIMO || fallback;
        }
        return String(value);
      };

      const safeNumber = (value, fallback = "—") => {
        const num = parseFloat(value);
        return isNaN(num) ? fallback : num.toString();
      };

      let transport = null;
      let portChargement = null;
      let portDechargement = null;
      let paysChargement = null;
      let transportNum = null;

      // Déterminer le type de transport
      if (hbl.MBL && hbl.MBL.TransMaritime) {
        transport = hbl.MBL.TransMaritime;
        portChargement = transport.villeChargement;
        portDechargement = transport.villeDechargement;
        paysChargement = transport.paysChargement;
        transportNum = transport.numIMO;
      } else if (hbl.MAWB && hbl.MAWB.TransAerienne) {
        transport = hbl.MAWB.TransAerienne;
        portChargement = transport.villeChargement;
        portDechargement = transport.villeDechargement;
        paysChargement = transport.paysChargement;
        transportNum = transport.numVol;
      }

      const doc = new PDFDocument({ margin: 50 });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename=facture_${safeText(hbl.numHBL || hbl.numHAWB, "inconnu")}.pdf`
      );

      doc.on("error", (err) => {
        console.error("Erreur PDF :", err);
        if (!res.headersSent) res.status(500).json({ error: "Erreur génération PDF" });
      });

      doc.pipe(res);

      // Entête
      doc.fontSize(20).text("ENTREPRISE DE TRANSIT INTERNATIONALE", { align: "center" });
      doc.fontSize(10)
        .text("Adresse : Andranomena, Antananarivo, Madagascar", { align: "center" })
        .text("Téléphone : +261 38 00 000 00 | Email : contact@transit.com", { align: "center" })
        .moveDown(2);

      // Titre facture
      doc.fontSize(16)
        .text(`FACTURE ${hbl.MBL ? "HBL" : "HAWB"} N° ${safeText(hbl.numHBL || hbl.numHAWB)}`,
          { align: "center", underline: true })
        .moveDown(1);

      // Infos générales
      const dateEmission = hbl.dateEmmission ? new Date(hbl.dateEmmission).toLocaleDateString("fr-FR") : "—";
      doc.fontSize(12)
        .text(`Date émission : ${dateEmission}`)
        .text(`Expéditeur : ${safeText(hbl.clientExp)}`)
        .text(`Destinataire : ${safeText(hbl.clientDest)}`)
        .text(`Port de chargement : ${safeText(portChargement)}`)
        .text(`Port de déchargement : ${safeText(portDechargement)}`)
        .text(`Pays : ${safeText(paysChargement)}`)
        .text(`Transport : ${safeText(transportNum)}`)
        .moveDown(2);

      // Détails du colis
      doc.fontSize(14).text("Détails du colis :", { underline: true }).moveDown(0.5);
      doc.font("Helvetica-Bold");
      doc.text("Nb Colis", 50, doc.y);
      doc.text("Poids (kg)", 150, doc.y);
      doc.text("Volume (m³)", 250, doc.y);
      doc.text("Description", 350, doc.y);
      doc.moveDown();
      doc.font("Helvetica");
      doc.text(safeNumber(hbl.nbColis), 50, doc.y);
      doc.text(safeNumber(hbl.poid), 150, doc.y);
      doc.text(safeNumber(hbl.volume), 250, doc.y);
      doc.text(safeText(hbl.description), 350, doc.y, { width: 200 });
      doc.moveDown(3);

      // Montants
      doc.fontSize(12)
        .text(`Fret : ${safeNumber(hbl.fret)} USD`)
        .text(`Assurance : ${safeNumber(hbl.assurance)} USD`)
        .text(`Autres frais : ${safeNumber(hbl.autresFrais)} USD`)
        .moveDown(2);

      // Remerciement
      doc.fontSize(10).fillColor("#555").text("Merci pour votre confiance.", { align: "center" });

      doc.end();

    } catch (error) {
      console.error("Erreur génération facture :", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Erreur lors de la génération du PDF" });
      }
    }
  }

}

module.exports = HouseController;