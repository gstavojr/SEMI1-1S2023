import { ConfigDB } from '../interfaces/db.interface';

export const DB_CONFIG: ConfigDB = {
  DB_HOST    : process.env.DB_HOST as string,
  DB_NAME    : process.env.DB_NAME as string,
  DB_USER    : process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
};


export const DB_CONFIG_AZURE: ConfigDB = {
  DB_HOST    : process.env.DB_HOST_AZURE as string,
  DB_NAME    : process.env.DB_NAME_AZURE as string,
  DB_USER    : process.env.DB_USER_AZURE as string,
  DB_PASSWORD: process.env.DB_PASSWORD_AUZRE as string,
};