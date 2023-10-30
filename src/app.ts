/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import projectRoutes from './routes/projects';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(indexRoutes);
app.use(projectRoutes);


const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));