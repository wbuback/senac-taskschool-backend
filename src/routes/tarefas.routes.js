import { Router } from 'express';
import * as controller from '../controllers/tarefas.controller.js';

const router = Router();

router.get('/', controller.listar);    // GET /tarefas
router.post('/', controller.criar);     // POST /tarefas

export default router;