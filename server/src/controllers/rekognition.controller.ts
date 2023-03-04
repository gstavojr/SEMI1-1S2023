import { Handler } from 'express';
import { configRekognition } from '../config/aws.config';

import aws from 'aws-sdk';

const rekognition = new aws.Rekognition(configRekognition);

// ? Analizar emociones de la cara
export const detectFaces: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
    Attributes: ['ALL'] // Muestra todos los atributos de la cara 
  }

  rekognition.detectFaces(params, (err, data) => {
    if ( err ) 
      return res.status(500).json({ message: 'error en la deteccion de caras', err })

    return res.status(200).json({ message: 'Deteccion exitosa', data }); 
  });


}


// ? Analizar texto
export const detectText: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
  }

  rekognition.detectText(params, (err, data) => {
    if ( err ) 
      return res.status(500).json({ message: 'error en la deteccion de texto', err })

    return res.status(200).json({ message: 'Deteccion exitosa', text: data.TextDetections }); 
  });


}

// ? Analizar famosos
export const recognizeCelebrities: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
  }

  rekognition.recognizeCelebrities(params, (err, data) => {
    if ( err ) 
      return res.status(500).json({ message: 'error en la deteccion de famosos', err })

    return res.status(200).json({ message: 'Deteccion exitosa', celebrity: data.CelebrityFaces }); 
  });


}

// ? Obtener Etiquetas
export const detectLabels: Handler = async (req, res) => {

  const { image } = req.body;

  if ( !image ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // S3Object: {
    //   Bucket: 'nombreBucket',
    //   Name: 'rutaDeLaImagen' // ejemplo: fotos/miImagen.jpg
    // },
    Image: {
      Bytes: Buffer.from(image, 'base64')
    },
    MaxLabels: 123
  }

  rekognition.detectLabels(params, (err, data) => {
    if ( err ) 
      return res.status(500).json({ message: 'error en la deteccion de etiquetas', err })

    return res.status(200).json({ message: 'Deteccion exitosa', labels: data.Labels }); 
  });


}


// ? Comparar fotos
export const compareFaces: Handler = async (req, res) => {

  const { image, image2 } = req.body;

  if ( !image || !image2 ) {
    return res.status(400).json({ message: 'Falta la foto' });
  }

  const params = {
    // Esta es la imagne que se va guardar 
    SourceImage: {
      Bytes: Buffer.from(image, 'base64')
    },
    // Esta es la imagne que se va comparar 
    TargetImage: {
      Bytes: Buffer.from(image2, 'base64')
    },

    SimilarityThreshold: 50, // Es el %  de comparacion || % de similitud

  }

  rekognition.compareFaces(params, (err, data) => {
    if ( err ) 
      return res.status(500).json({ message: 'error en la compracion de rostros', err })

    return res.status(200).json({ message: 'Comparacion exitosa', match: data.FaceMatches }); 
  });


}