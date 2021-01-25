import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({ user_id: request.user.id, avatarFilename: request.file.filename });

  response.json(user);
});

export default usersRouter;