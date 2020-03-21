import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

const routes = Router();

routes.post('/session', SessionController.store);

// Allow only admins
routes.post('/recipients', RecipientsController.store);

export default routes;
