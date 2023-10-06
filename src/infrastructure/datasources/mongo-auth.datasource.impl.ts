import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { LoginuserDto } from '../../domain/dtos/auth/login-user.dto';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class MongoAuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}

  async login(loginuserDto: LoginuserDto): Promise<UserEntity> {
    const { email, password } = loginuserDto;

    try {
      const exist = await UserModel.findOne({ email });

      if (!exist) throw CustomError.notFound('User not found');

      if (!this.comparePassword(password, exist.password))
        throw CustomError.badRequest('Invalid credentials');

      return UserMapper.userEntityFromObject(exist);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('Internal server erorr');
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const exists = await UserModel.findOne({ email });

      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });

      user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
