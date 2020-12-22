import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdatedUserService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
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
