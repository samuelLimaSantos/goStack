import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdatedUserService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      email,
      name,
      password,
    });

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updatedUserService = container.resolve(UpdatedUserService);

    const user = await updatedUserService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    user.password = '';

    return response.json(user);
  }
}
