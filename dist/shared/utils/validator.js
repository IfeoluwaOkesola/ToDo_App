"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFutureDate = void 0;
const class_validator_1 = require("class-validator");
let IsFutureDate = class IsFutureDate {
    validate(date, args) {
        const inputDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
    }
    defaultMessage(args) {
        return 'Due date must be a future date.';
    }
};
exports.IsFutureDate = IsFutureDate;
exports.IsFutureDate = IsFutureDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsFutureDate', async: false })
], IsFutureDate);
//# sourceMappingURL=validator.js.map