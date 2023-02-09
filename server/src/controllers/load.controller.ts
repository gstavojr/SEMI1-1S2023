import { Handler } from 'express';
import aws from 'aws-sdk';
import { config as configAWS } from '../config/aws.config'
import { S3Params, S3ParamsGetFile } from '../interfaces/aws.interface';

export const upload: Handler = (req, res) => {

  const { id, photo } = req.body;

  if ( !id || !photo ) {
    return res.status(400).json({ message: 'Falta el id o la foto' });
  }

  // El id es el nombre de la imagen y tiene que ser unico si se le agrega con el mismo id se sobreescribe la imagen
  // Carpeta y nombre de la imagen
  const pathName = `fotos/${id}.jpg`;
  // Se convierte la imagen a un buffer
  const buff = Buffer.from(photo, 'base64');

  // Se colocal la region del bucket y las credenciales
  // Nunca subir las credecioanes a github o gitlab
  // posiblemete les puede bloquar la cuenta de aws por que expusieron las credenciales en un repositorio publico
  aws.config.update(configAWS); 

  // Se crea una valirable que contiene el servicio o caracteristicas S3
  const s3 = new aws.S3();

  const paramsS3: S3Params = {
    Bucket     : 'testbucketseminario',
    Key        : pathName,
    Body       : buff,
    ContentType: 'image'
  }


  s3.putObject(paramsS3, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json({ message: 'Se agrego la imagen exitosamente', data });  
  });


};


export const download: Handler = (req, res) => {

  const { id } = req.body;

  const pathName = `fotos/${id}.jpg`;

  aws.config.update(configAWS);

  const s3 = new aws.S3();

  // Se crea una valirable que contiene el servicio o caracteristicas S3
  const paramsGetFileS3: S3ParamsGetFile = {
    Bucket: 'testbucketseminario',
    Key   : pathName
  };

  s3.getObject(paramsGetFileS3, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    // ustedes verifica ya en la base de datos que si exista la imagen

    const image = Buffer.from(data.Body as Buffer).toString('base64');
    return res.status(200).json({ message: 'Se descargo la imagen exitosamente', image });  
  });

};
