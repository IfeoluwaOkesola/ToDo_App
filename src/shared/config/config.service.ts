import * as dotenv from 'dotenv';
dotenv.config();

export const config = () => ({
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
