import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

  async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
