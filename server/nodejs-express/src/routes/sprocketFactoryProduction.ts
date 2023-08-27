import express from 'express';
import { SprocketFactoryProductionController } from '../controllers/sprocketFactoryProduction';


export const setRoutes = (router: express.Router) => {
  router.get('/api/production/v1', async (_req, res) => {
    const controller = new SprocketFactoryProductionController();
    const response = await controller.getAll();

    return res.send(response);
  });

  router.get('/api/production/v1/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketFactoryProductionController();
    const response = await controller.getOne(id);

    return res.send(response);
  });

  router.get('/api/production/v1/factory/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketFactoryProductionController();
    const response = await controller.getAllByFactory(id);

    return res.send(response);
  });

  router.get('/api/production/v1/sprocket/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketFactoryProductionController();
    const response = await controller.getAllBySprocket(id);

    return res.send(response);
  });

  router.post('/api/production/v1', async (req, res) => {
    const itemDto = req.body;

    const controller = new SprocketFactoryProductionController();
    const response = await controller.create(itemDto);

    return res.send(response);
  });

  router.put('/api/production/v1/:id', async (req, res) => {
    const id = req.params.id;
    const itemDto = req.body;

    const controller = new SprocketFactoryProductionController();
    const response = await controller.update(id, itemDto);

    return res.send(response);
  });

  router.delete('/api/production/v1/:id', async (req, res) => {
    const id = req.params.id;

    const controller = new SprocketFactoryProductionController();
    const response = await controller.getOne(id);

    return res.send(response);
  });
}
