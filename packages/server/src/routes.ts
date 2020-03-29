import { Router } from 'express';
import multer from 'multer';

import SessionController from '@controllers/SessionController';
import RecipientsController from '@controllers/RecipientsController';
import FileController from '@controllers/FileController';
import DeliverymanController from '@controllers/DeliverymanController';

import auth from '@middlewares/auth';
import multerConfig from '@config/multer';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.use(auth);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.remove);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.remove);

export default routes;
