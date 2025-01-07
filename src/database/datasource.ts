import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Load environment variables manually for CLI compatibility
ConfigModule.forRoot();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get<string>('DB_URL'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;