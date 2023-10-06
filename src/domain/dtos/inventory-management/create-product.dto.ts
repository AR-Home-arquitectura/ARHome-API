import { Validators } from '../../../config';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly stock: number,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, stock, price, description, user, category } = props;

    if (!stock || stock < 0) return ['Invalid Stock', undefined];

    if (!price || price < 0) return ['Invalid Price', undefined];

    if (!description) return ['Invalid Description', undefined];

    if (!name) return ['Missing name', undefined];

    if (!user) return ['Missing user', undefined];
    if (!Validators.isMongoID(user)) return ['Invalid User ID', undefined];

    if (!category) return ['Missing category', undefined];
    if (!Validators.isMongoID(category)) return ['Invalid User ID', undefined];

    return [
      undefined,
      new CreateProductDto(name, stock, price, description, user, category),
    ];
  }
}
