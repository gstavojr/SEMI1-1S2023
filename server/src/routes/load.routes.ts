import { Router } from 'express';
import { upload, download } from '../controllers/load.controller';
import { uploadAndSaveDynamo } from '../controllers/dynamo.controller';
import { getData, saveData, getDataAzure, saveDataAzure } from '../controllers/rds.controller';

import * as rk from '../controllers/rekognition.controller';

const router = Router();

router.post('/upload', upload);
router.post('/download', download);
router.post('/uploadAndSaveDynamo', uploadAndSaveDynamo);

// RDS
router.get('/getData', getData);
router.post('/saveData', saveData);

// AZURE
router.get('/getDataAzure', getDataAzure);
router.post('/saveDataAzure', saveDataAzure);

// Rekognition
router.post('/detectar-cara', rk.detectFaces);
router.post('/detectar-texto', rk.detectText);
router.post('/detectar-famoso', rk.recognizeCelebrities);
router.post('/detectar-etiqueta', rk.detectLabels);
router.post('/comparar-fotos', rk.compareFaces);


export default router;
