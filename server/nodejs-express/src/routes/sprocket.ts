import express from 'express';

import { SprocketController } from '../controllers/sprocket';


export const setRoutes = (router: express.Router) => {
  router.get('/api/sprockets/v1', async (_req, res) => {
    const controller = new SprocketController();
    const response = await controller.getAll();

    return res.send(response);
  });

  router.get('/api/sprockets/v1/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketController();
    const response = await controller.getOne(id);

    return res.send(response);
  });

  router.post('/api/sprockets/v1', async (req, res) => {
    const itemDto = req.body;

    const controller = new SprocketController();
    const response = await controller.create(itemDto);

    return res.send(response);
  });

  router.put('/api/sprockets/v1/:id', async (req, res) => {
    const id = req.params.id;
    const itemDto = req.body;

    const controller = new SprocketController();
    const response = await controller.update(id, itemDto);

    return res.send(response);
  });

  router.delete('/api/sprockets/v1/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketController();
    const response = await controller.delete(id);

    return res.send(response);
  });
}
