import express from 'express';
import { SprocketFactoryController } from '../controllers/sprocketFactory';


export const setRoutes = (router: express.Router) => {
  router.get('/api/factories/v1', async (_req, res) => {
    const controller = new SprocketFactoryController();
    const response = await controller.getAll();

    return res.send(response);
  });

  router.get('/api/factories/v1/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketFactoryController();
    const response = await controller.getOne(id);

    return res.send(response);
  });

  router.post('/api/factories/v1', async (req, res) => {
    const itemDto = req.body;

    const controller = new SprocketFactoryController();
    const response = await controller.create(itemDto);

    return res.send(response);
  });

  router.put('/api/factories/v1/:id', async (req, res) => {
    const id = req.params.id;
    const itemDto = req.body;

    const controller = new SprocketFactoryController();
    const response = await controller.update(id, itemDto);

    return res.send(response);
  });

  router.delete('/api/factories/v1/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketFactoryController();
    const response = await controller.getOne(id);

    return res.send(response);
  });
}
