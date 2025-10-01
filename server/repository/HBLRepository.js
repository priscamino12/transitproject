const HBL = require("../models/HBL");
const MBL = require("../models/MBL");
const Client = require("../models/Client");
const sequelize = require("../config/database");
const { fn, col, Sequelize } = require("sequelize");
const TransMaritime = require("../models/TransMaritime");

class HBLRepository {
  async create(Data) {
    return await HBL.create(Data);
  }
  async findById(id) {
    return await HBL.findByPk(id, {
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
        { model: Client, as: "clientExp", attributes: ["nomClient", "adresseClient", "telClient"] },
        { model: Client, as: "clientDest", attributes: ["nomClient", "adresseClient", "telClient"] }
      ]
    });
  }

  async countAll() {
    return await HBL.count();
  }
  async countAllOnYear() {
    return await HBL.count({
      where: Sequelize.where(
        fn("YEAR", col("dateEmmission")),
        new Date().getFullYear()
      ),
    });
  }

  async countByMonth() {
    const results = await sequelize.query(
      `
    SELECT 
      MONTH(dateEmmission) AS mois, 
      COUNT(*) AS count,
      SUM(fret + assurance + autresFrais) AS revenus
    FROM hbls
    WHERE YEAR(dateEmmission) = YEAR(CURRENT_DATE)
    GROUP BY mois;
  `,
      { type: sequelize.QueryTypes.SELECT });
    return results;
  }


  async findAll() {
    return await HBL.findAll({
      attributes: [
        "idHBL",
        "numHBL",
        "dateEmmission",
        "idMBL",
        "nbColis",
        "poid",
        "volume",
        "description",
      ],
      include: [
        {
          model: MBL,
          attributes: ["idMBL", "numMBL"],
          required: true,
          include: [
            {
              model: TransMaritime,
              attributes: [
                "idTransMaritime",
                "numIMO",
                "armateur",
                "nomNavire",
                "dateChargement",
                "paysChargement",
                "villeChargement",
                "paysDechargement",
                "villeDechargement"],
              required: true,
            }
          ]
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["idClient", "nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["idClient", "nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async findByNum(num) {
    return await HBL.findOne({
      where: {
        numHBL: num,
      },
      attributes: [
        "idHBL",
        "numHBL",
        "dateEmmission",
        "idMBL",
        "nbColis",
        "poid",
        "volume",
        "description",
      ],
      include: [
        {
          model: MBL,
          attributes: ["idMBL, numMBL"],
          required: true,
          include: [
            {
              model: TransMaritime,
              attributes: [
                "idTransMaritime",
                "numIMO",
                "armateur",
                "nomNavire",
                "dateChargement",
                "paysChargement",
                "villeChargement",
                "paysDechargement",
                "villeDechargement"],
              required: true,
            }
          ]
        },
        {
          model: Client,
          as: "clientExp",
          attributes: ["nomClient"],
          required: true,
        },
        {
          model: Client,
          as: "clientDest",
          attributes: ["nomClient"],
          required: true,
        },
      ],
    });
  }
  async findAllByMaster(id) {
    return await HBL.findAll({
      where: {
        idMBL: id,
      },
      attributes: [
        "idHBL",
        "numHBL",
        "dateEmmission",
        "nbColis",
        "poid",
        "volume",
      ],
      include: [
        {
          model: MBL,
          attributes: ["numMBL"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async totalColis(id) {
    return await HBL.findAll({
      where: {
        idMBL: id,
      },
      attributes: [
        [fn("SUM", col("nbColis")), "totalNbColis"],
        [fn("SUM", col("poid")), "totalPoid"],
        [fn("SUM", col("volume")), "totalVolume"],
      ],
    });
  }
  async update(id, HBLData) {
    const hBL = await this.findById(id);
    if (hBL) {
      return await HBL.update(HBLData, { where: { idHBL: id } });
    }
    return null;
  }
  async delete(id) {
    const hBL = await this.findById(id);
    if (hBL) {
      return await HBL.destroy({ where: { idHBL: id } });
    }
    return null;
  }
}

module.exports = HBLRepository;
