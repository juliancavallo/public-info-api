import express from 'express';
import controller from '../controllers/projects.controller';

const router = express.Router();

router.get('/projects', controller.getAll);

export default router;