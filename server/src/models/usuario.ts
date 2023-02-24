import { DataTypes, Model, Optional } from "sequelize";
import { dbAzure } from '../database/db';


interface UsuarioAttributes {
  id      : number;
  name    : string;
  lastname: string;
}

// Aqui se indica que el id es opcional, por que  eso lo maneja la db
interface UsuarioCreationAttributes
  extends Optional<UsuarioAttributes, 'id'> {}

// Se crea el modelo y se extiende sus atributos
interface UsuarioInstance
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>,
  UsuarioAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  }

// Se define el modelo 
export const Usuario = dbAzure.define<UsuarioInstance>('Usuario', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },

});