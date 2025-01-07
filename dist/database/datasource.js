"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot();
const configService = new config_1.ConfigService();
exports.dataSourceOptions = {
    type: 'postgres',
    url: configService.get('DB_URL'),
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
    migrations: ['dist/database/migrations/*.js'],
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=datasource.js.map