import { Router } from 'express';

import SessionController from '@controllers/SessionController';
import RecipientsController from '@controllers/RecipientsController';

const routes = Router();

routes.post('/session', SessionController.store);

// Allow only admins
routes.post('/recipients', RecipientsController.store);

export default routes;
