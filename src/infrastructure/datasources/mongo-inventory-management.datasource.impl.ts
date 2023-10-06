import { CategoryMapper, ProductMapper } from '..';
import { CategoryModel, ProductModel } from '../../data/mongodb';
import {
  CreateProductDto,
  ProductEntity,
  PaginationDto,
  PageableDto,
  CreateCategoryDto,
  CategoryEntity,
  CustomError
} from '../../domain';
import { InventoryManagementDatasource } from '../../domain/datasources/inventory-management.datasource';

export class MongoInventoryManagementDatasourceImpl implements InventoryManagementDatasource {
  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const productExists = await ProductModel.findOne({ name: createProductDto.name });
    if (productExists) throw CustomError.badRequest('Product already exists');

    try {
      const product = new ProductModel(createProductDto);

      await product.save();
      await product.populate('user');
      await product.populate('category');

      return ProductMapper.productEntityFromObject(product);
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto): Promise<PageableDto<ProductEntity[]>> {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category')
      ]);

      const data = products.map((product) => ProductMapper.productEntityFromObject(product));

      const response = new PageableDto<ProductEntity[]>(
        page,
        limit,
        total,
        `/api/products?page=${page + 1}&limit=${limit}`,
        page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        data
      );

      return response;
    } catch (error) {
      throw CustomError.internalServerError('Internal Server Error');
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...createCategoryDto
      });

      await category.save();

      return CategoryMapper.categoryEntityFromObject(category);
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto): Promise<PageableDto<CategoryEntity[]>> {
    const { page, limit } = paginationDto;

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
      ]);

      const data = categories.map((category) => CategoryMapper.categoryEntityFromObject(category));

      return new PageableDto<CategoryEntity[]>(
        page,
        limit,
        total,
        `/api/categories?page=${page + 1}&limit=${limit}`,
        page - 1 > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        data
      );
    } catch (error) {
      throw CustomError.internalServerError('Internal Server Error');
    }
  }
}
