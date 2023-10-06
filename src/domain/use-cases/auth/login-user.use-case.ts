import { JwtAdapter } from '../../../config';
import { LoginuserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginUserUseCase {
  execute(loginuserDto: LoginuserDto): Promise<UserData>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(loginuserDto: LoginuserDto): Promise<UserData> {
    const user = await this.authRepository.login(loginuserDto);

    const token = await this.signToken({ id: user.id }, '2h');

    if (!token) throw CustomError.internalServerError('Internal server error');

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
