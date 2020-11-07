import { Request, Response } from 'express';
import CreateUser from './services/CreateUser';

export const helloWorld = (request: Request, response: Response) => {
  const user = CreateUser({
    email: 'seuemail@com.br', password: '12346',
    techs: ['NodeJs',
      'RectJs',
      'React Native',
      { title: 'Javascript', experience: 100 }]
  });
  
  return response.json({ message: 'Hello Gostack' });
};

