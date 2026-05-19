import 'dotenv/config';
import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import roomRoutes from './routes/room.routes.js';
import savedRoutes from './routes/saved.routes.js';
import marketplaceRoutes from './routes/marketplace.routes.js';

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api', marketplaceRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Match-Live API está funcionando');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
