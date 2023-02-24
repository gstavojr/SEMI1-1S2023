import { Sequelize } from "sequelize";
import { DB_CONFIG, DB_CONFIG_AZURE } from '../config/db.config';


const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = DB_CONFIG;

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host   : DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps     : false
  }
});


export const dbAzure = new Sequelize(
  DB_CONFIG_AZURE.DB_NAME,
  DB_CONFIG_AZURE.DB_USER,
  DB_CONFIG_AZURE.DB_PASSWORD, {
    host   : DB_CONFIG_AZURE.DB_HOST,
    dialect: 'mssql',
    define: {
      freezeTableName: true,
      timestamps     : false
    }
  }
)