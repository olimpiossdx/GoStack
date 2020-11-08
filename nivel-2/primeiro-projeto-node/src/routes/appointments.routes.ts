import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => response.json({ message: 'Hello Gostack' }));

export default appointmentsRouter;
