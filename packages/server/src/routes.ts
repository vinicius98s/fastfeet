import { Router } from 'express';

import SessionController from '@controllers/SessionController';
import RecipientsController from '@controllers/RecipientsController';

import auth from '@middlewares/auth';

const routes = Router();

routes.post('/session', SessionController.store);

routes.post('/recipients', auth, RecipientsController.store);
routes.put('/recipients/:id', auth, RecipientsController.update);
routes.delete('/recipients/:id', auth, RecipientsController.remove);

export default routes;
