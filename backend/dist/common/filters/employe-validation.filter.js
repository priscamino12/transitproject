"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeValidationFilter = void 0;
const common_1 = require("@nestjs/common");
let EmployeValidationFilter = class EmployeValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        let message = 'Erreur de validation des données de l\'employé';
        const errorResponse = exception.getResponse();
        if (typeof errorResponse === 'object' && 'message' in errorResponse) {
            const messages = errorResponse.message;
            if (Array.isArray(messages)) {
                if (messages.some(msg => msg.includes('must be a string') || msg.includes('must be an email'))) {
                    message = 'Les données fournies pour l\'employé sont invalides. Veuillez vérifier les champs : nomEmploye (requis, texte), emailEmploye (requis, email valide), motDePasse (requis, texte), typeEmploye (requis, texte).';
                }
                else if (messages.some(msg => msg.includes('should not exist'))) {
                    message = 'Des champs non autorisés ont été fournis pour l\'employé. Utilisez uniquement : nomEmploye, emailEmploye, motDePasse, typeEmploye.';
                }
                else {
                    message = 'Données de l\'employé invalides. Vérifiez les informations fournies.';
                }
            }
            else {
                message = messages || 'Données de l\'employé invalides.';
            }
        }
        response.status(status).json({
            success: false,
            message,
            data: null,
        });
    }
};
exports.EmployeValidationFilter = EmployeValidationFilter;
exports.EmployeValidationFilter = EmployeValidationFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], EmployeValidationFilter);
