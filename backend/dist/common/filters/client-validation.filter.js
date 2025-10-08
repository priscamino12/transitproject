"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidationFilter = void 0;
const common_1 = require("@nestjs/common");
let ClientValidationFilter = class ClientValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        let message = 'Erreur de validation des données du client';
        const errorResponse = exception.getResponse();
        if (typeof errorResponse === 'object' && 'message' in errorResponse) {
            const messages = errorResponse.message;
            if (Array.isArray(messages)) {
                if (messages.some(msg => msg.includes('must be a string'))) {
                    message = 'Certains champs doivent être des chaînes de caractères : nomClient, CINClient, telClient, adresseClient.';
                }
                else if (messages.some(msg => msg.includes('must be an email'))) {
                    message = "L'email du client doit être une adresse email valide.";
                }
                else if (messages.some(msg => msg.includes('should not be empty'))) {
                    message = 'Les champs obligatoires (nomClient, emailClient, CINClient, creerPar) ne peuvent pas être vides.';
                }
                else if (messages.some(msg => msg.includes('must be an integer'))) {
                    message = "Le champ creerPar doit être un entier (ID de l'employé créateur).";
                }
                else if (messages.some(msg => msg.includes('should not exist'))) {
                    message = 'Des champs non autorisés ont été fournis. Utilisez uniquement : nomClient, emailClient, telClient, adresseClient, CINClient, creerPar.';
                }
                else {
                    // si on ne connaît pas le type exact, on renvoie tout le tableau pour déboguer
                    message = `Erreurs de validation : ${messages.join(', ')}`;
                }
            }
            else {
                message = messages || 'Données du client invalides.';
            }
        }
        response.status(status).json({
            success: false,
            message,
            data: null,
        });
    }
};
exports.ClientValidationFilter = ClientValidationFilter;
exports.ClientValidationFilter = ClientValidationFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], ClientValidationFilter);
