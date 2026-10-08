import { Router } from 'express';
import { createResourceController } from '../controllers/resourceController.js';

export function resourceRouter(table) {
  const c = createResourceController(table);
  const router = Router();
  router.get('/', c.list);
  router.get('/:id', c.get);
  router.post('/', c.create);
  router.put('/:id', c.update);
  router.delete('/:id', c.remove);
  return router;
}
