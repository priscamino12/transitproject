"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const config_1 = require("@nestjs/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const configService = app.get(config_1.ConfigService);
    app.use((0, cookie_parser_1.default)());
    // Optionnel : CORS pour autoriser les cookies côté front
    app.enableCors({
        origin: 'http://localhost:3000', // front Next.js
        credentials: true, // cookies autorisés
    });
    const port = configService.get('PORT') || 3001;
    await app.listen(port);
    console.log(`🚀 Application running on: http://localhost:${port}`);
}
bootstrap();
