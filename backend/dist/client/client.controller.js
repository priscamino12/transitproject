"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const client_validation_filter_1 = require("../common/filters/client-validation.filter");
let ClientController = class ClientController {
};
exports.ClientController = ClientController;
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('clients'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(client_validation_filter_1.ClientValidationFilter)
], ClientController);
