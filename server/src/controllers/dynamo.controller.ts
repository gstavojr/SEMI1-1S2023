import { Handler } from 'express';

import { configS3 as configAWSS3, configDynamoDB } from '../config/aws.config'
import { S3Params } from '../interfaces/aws.interface';
import { v4 as uuidv4 } from 'uuid';

import aws from 'aws-sdk';


const s3 = new aws.S3(configAWSS3);
const dynamoDB = new aws.DynamoDB(configDynamoDB);

export const uploadAndSaveDynamo: Handler = async (req, res) => {

  const { name, photo } = req.body;

  if ( !name || !photo ) {
    return res.status(400).json({ message: 'Falta el nombre o la foto' });
  }

  const pathName = `fotos/${name}.jpg`;
  const buff = Buffer.from(photo, 'base64');

  

  const paramsS3: S3Params = {
    Bucket     : 'seminariobucket',
    Key        : pathName,
    Body       : buff,
    ContentType: 'image',
    ACL        : 'public-read' // ! Le aplica la politica al objeto que se esta guardando
  }
  // Cualquiera puede leer este elemento 


  try {
    const s3Resp = await s3.upload(paramsS3).promise();
    console.log(s3Resp.Location);

    await dynamoDB.putItem({
      TableName: 'testdb',
      Item: {
        id      : { S: uuidv4() }, // Identificador unico que se definio a la hora de crear la tabla 
        name    : { S: name },
        location: { S: s3Resp.Location }
      }
    }).promise()

    return res.status(200).json({ message: 'Se agrego la imagen exitosamente' }); 
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error en la subida de imagen', error });
  }


};