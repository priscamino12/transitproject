"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const entreprise_module_1 = require("./entreprise/entreprise.module");
const paiement_module_1 = require("./paiement/paiement.module");
const type_acces_module_1 = require("./type-acces/type-acces.module");
const abonnement_module_1 = require("./abonnement/abonnement.module");
const mode_paiement_module_1 = require("./mode-paiement/mode-paiement.module");
const employe_module_1 = require("./employe/employe.module");
const admin_systeme_module_1 = require("./admin-systeme/admin-systeme.module");
const duree_abonnement_module_1 = require("./duree-abonnement/duree-abonnement.module");
const dossier_module_1 = require("./dossier/dossier.module");
const status_module_1 = require("./status/status.module");
const expedition_module_1 = require("./expedition/expedition.module");
const produit_controller_1 = require("./produit/produit.controller");
const document_controller_1 = require("./document/document.controller");
const document_service_1 = require("./document/document.service");
const produit_service_1 = require("./produit/produit.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            admin_systeme_module_1.AdminSystemeModule,
            entreprise_module_1.EntrepriseModule,
            employe_module_1.EmployeModule,
            mode_paiement_module_1.ModePaiementModule,
            paiement_module_1.PaiementModule,
            type_acces_module_1.TypeAccesModule,
            abonnement_module_1.AbonnementModule,
            duree_abonnement_module_1.DureeAbonnementModule,
            dossier_module_1.DossierModule,
            status_module_1.StatusModule,
            expedition_module_1.ExpeditionModule,
        ],
        controllers: [produit_controller_1.ProduitController, document_controller_1.DocumentController],
        providers: [produit_service_1.ProduitService, document_service_1.DocumentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map