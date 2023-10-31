/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import indexRoutes from './src/routes/index';
import projectRoutes from './src/routes/projects';
const cors = require('cors');

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(indexRoutes);
app.use(projectRoutes);


const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

module.exports = app;