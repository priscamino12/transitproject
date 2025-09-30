import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@/types/api-response';

@Catch(BadRequestException)
export class EmployeValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = 'Erreur de validation des données de l\'employé';

    const errorResponse = exception.getResponse();
    if (typeof errorResponse === 'object' && 'message' in errorResponse) {
      const messages = errorResponse.message as string | string[];
      if (Array.isArray(messages)) {
        if (messages.some(msg => msg.includes('must be a string') || msg.includes('must be an email'))) {
          message = 'Les données fournies pour l\'employé sont invalides. Veuillez vérifier les champs : nomEmploye (requis, texte), emailEmploye (requis, email valide), motDePasse (requis, texte), typeEmploye (requis, texte).';
        } else if (messages.some(msg => msg.includes('should not exist'))) {
          message = 'Des champs non autorisés ont été fournis pour l\'employé. Utilisez uniquement : nomEmploye, emailEmploye, motDePasse, typeEmploye.';
        } else {
          message = 'Données de l\'employé invalides. Vérifiez les informations fournies.';
        }
      } else {
        message = messages || 'Données de l\'employé invalides.';
      }
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
    } as ApiResponse<null>);
  }
}