import { 
  AuthenticationDetails, 
  CognitoUser, 
  CognitoUserAttribute, 
  CognitoUserPool 
} from 'amazon-cognito-identity-js';
import { configCognito } from '../config/aws.config';
import { Handler } from 'express';

import crypto from 'crypto';


const coginito = new CognitoUserPool(configCognito);

export const signUp: Handler = async (req, res) => {

  const { email, password, name, carnet, username  } = req.body;

  const attributeList: CognitoUserAttribute[] = []; // Lista de atributos que tiene el usuario

  // * Nombre

  // Tiene informacion del nombre del usuario
  const dataName = {
    Name: 'name', // El nombre de la propiedad
    Value: name // Valor del atributo
  }

  // Agregar el atributo que devuelve cognitoIdentity a la lista
  attributeList.push(new CognitoUserAttribute(dataName));

  // * Email

  const dataEmail = {
    Name: 'email',
    Value: email
  }

  attributeList.push(new CognitoUserAttribute(dataEmail));

  // * Carnet

  const dataCarnet = {
    Name: 'custom:carnet',
    Value: `${carnet}`
  }
  
  attributeList.push(new CognitoUserAttribute(dataCarnet));


  // * Password
  // Se encripta la password
  // Crypto es una libreria de nodejs

  const hash = crypto.createHash('sha256').update(password).digest('hex');
  
  // Se realiza el registro del usuario
  coginito.signUp(
    username, 
    hash + 'D**', 
    attributeList, 
    null!, 
    (err, data) => {
      if ( err ) 
        return res
          .status(500)
          .json({ message: `Error al registrar usuario ${email}`, err });

      return res.status(200).json({ message: 'Usuario registrado', data });
    }
  );

}



