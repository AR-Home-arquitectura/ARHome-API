import {
  AuthDatasource,
  AuthRepository,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { LoginuserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  login(loginuserDto: LoginuserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginuserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
