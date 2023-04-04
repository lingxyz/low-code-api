"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const typeorm_1 = require("typeorm");
const helloApi = {
    params: [{
            name: "name",
            required: "true",
            message: "name不能为空"
        }, {
            name: "age",
            required: "true",
            message: "age不能为空"
        }],
    steps: [{
            type: "SQL",
            content: "select * from table",
            result: {}
        }, {
            type: "function",
            params: ['a'],
            content: "console.log(a); return '你的年纪是' + (Number(a.age) + 1)",
            result: {}
        }, {
            type: "function",
            params: ['a'],
            content: "console.log(a); return '你的名字是' + a.name + '；你的年纪加十岁是' + (Number(a.age) + 10)",
            result: {}
        }, {
            type: "script",
            content: "console.log(111)",
            result: {}
        }],
    response: {
        type: "json",
        data: "2"
    }
};
let AppController = class AppController {
    constructor(appService, entityManager) {
        this.appService = appService;
        this.entityManager = entityManager;
    }
    async getHello(queryParams) {
        helloApi.params.forEach(param => {
            if (!queryParams[param.name] && param.required) {
                throw new common_1.BadRequestException(param.message);
            }
        });
        helloApi.steps.forEach(step => {
            if (step.type === 'SQL') {
                step.result = { step1: 'sql result obj' };
            }
            if (step.type === 'function') {
                const myFunction = new Function(...step.params, step.content);
                step.result = myFunction(queryParams);
            }
            if (step.type === 'script') {
                step.result = eval(step.content);
            }
        });
        let response = {};
        if (helloApi.response.type === 'json') {
            response = { type: 'json', result: helloApi.steps[helloApi.response.data].result };
        }
        if (helloApi.response.type === 'excel') {
            response = { type: 'excel', result: helloApi.response.data };
        }
        if (helloApi.response.type === 'status') {
            response = { type: 'ok', status: 1 };
        }
        return response;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, typeorm_1.EntityManager])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map