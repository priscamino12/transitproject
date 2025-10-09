"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCookieInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let JwtCookieInterceptor = class JwtCookieInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        return next.handle().pipe((0, rxjs_1.tap)((data) => {
            if (data?.data?.token) {
                response.cookie('jwt', data.data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600 * 1000 * 24 * 90,
                });
                delete data.data.token;
            }
        }));
    }
};
exports.JwtCookieInterceptor = JwtCookieInterceptor;
exports.JwtCookieInterceptor = JwtCookieInterceptor = __decorate([
    (0, common_1.Injectable)()
], JwtCookieInterceptor);
//# sourceMappingURL=jwt-cookie.interceptor.js.map