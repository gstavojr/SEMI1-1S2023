import { Router } from 'express';
import { upload, download } from '../controllers/load.controller';

const router = Router();

router.post('/upload', upload);
router.post('/download', download);

export default router;
