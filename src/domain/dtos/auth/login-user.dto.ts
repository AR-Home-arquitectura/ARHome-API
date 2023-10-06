import { Validators } from '../../../config';

export class LoginuserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginuserDto?] {
    const { email, password } = object;

    if (!email) return ['Missing email', undefined];
    if (!Validators.email.test(email)) return ['Invalid email', undefined];
    if (!password) return ['Missing password', undefined];
    if (password.length < 6) return ['Password too short', undefined];

    return [undefined, new LoginuserDto(email, password)];
  }
}
