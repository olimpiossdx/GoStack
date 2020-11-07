import express, { request, response } from 'express';
import { helloWorld } from './routes';

const app = express();

// app.get('/', (_request, response) => {
//   return response.json({ message: 'Hello goStack' });
// });

app.get('/', helloWorld);

app.listen(3333, () => console.log('🚀 Back-end started!'));