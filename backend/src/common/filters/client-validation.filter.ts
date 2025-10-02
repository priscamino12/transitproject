import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@/types/api-response';

@Catch(BadRequestException)
export class ClientValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let message = 'Erreur de validation des données du client';
    const errorResponse = exception.getResponse();

    if (typeof errorResponse === 'object' && 'message' in errorResponse) {
      const messages = errorResponse.message as string | string[];

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
      } else {
        message = messages || 'Données du client invalides.';
      }
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
    } as ApiResponse<null>);
  }
}
