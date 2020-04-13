import { Router } from 'express';
import multer from 'multer';

import SessionController from '@controllers/SessionController';
import RecipientController from '@controllers/RecipientController';
import FileController from '@controllers/FileController';
import DeliverymanController from '@controllers/DeliverymanController';
import OrderController from '@controllers/OrderController';

import auth from '@middlewares/auth';
import multerConfig from '@config/multer';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);
routes.post('/session/validate', SessionController.validate);

routes.use(auth);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.remove);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.remove);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.remove);

export default routes;
