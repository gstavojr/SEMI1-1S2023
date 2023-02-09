import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import loadRoutes from './routes/load.routes';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({ message: 'Seminario de sistemas 1' });
});

app.use('/api', loadRoutes);

export default app;