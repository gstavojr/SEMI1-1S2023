import { Handler } from 'express';
import { db } from '../database/db';
import { Usuario } from '../models/usuario';

export const getData: Handler = async (req, res) => {

  try {
    
    const query = `SELECT * FROM Ejemplo`;

    const queryResp = await db.query(query);

    const data = queryResp[0];
    return res.status(200).json({ message: 'Succes', data });



  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
}


export const saveData: Handler = async (req, res) => {

  const { name, location } = req.body;

  try {
    const query = `INSERT INTO Ejemplo(nombre, location) 
      VALUES (:nombre, :location);`;

    await db.query(query, {
      replacements: {
        nombre: name,
        location
      }
    });

    return res.status(200).json({ message: 'Exitoso' });
    
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }


}


// AZURE SQL
export const getDataAzure: Handler = async (req, res) => {

  try {
    
    const usuarios = await Usuario.findAll();

    return res.status(200).json({ message: 'Succes', data: usuarios });


  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
}


export const saveDataAzure: Handler = async (req, res) => {

  const { name, lastname } = req.body;

  try {

    const usuario = await Usuario.create({ name, lastname });

  
    
    return res.status(200).json({ message: 'Exitoso', usuario });
    
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }


}
