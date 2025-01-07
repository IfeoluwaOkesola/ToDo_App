"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
dotenv.config();
const config = () => ({
    PORT: {
        APP_PORT: process.env.PORT,
    },
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES: process.env.JWT_EXPIRES,
    database: {
        type: 'postgres',
        url: process.env.DB_URL,
    },
});
exports.config = config;
//# sourceMappingURL=config.service.js.map