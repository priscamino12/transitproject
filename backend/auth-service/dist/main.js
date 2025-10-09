"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || 3001;
    const FRONTEND_URL = configService.get('FRONTEND_URL');
    const HOST = configService.get('HOST');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: FRONTEND_URL,
        credentials: true,
    });
    await app.listen(PORT);
    console.log(`🚀 Application running on: ${HOST}:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map