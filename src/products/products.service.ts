import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities';
import {
    CreateProductDto,
    UpdateProductDto
} from './dtos';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity) private readonly productsRepository: Repository<ProductsEntity>
    ) {}

    async create(createProductDto: CreateProductDto): Promise<ProductsEntity> {
        const product = this.productsRepository.create(createProductDto)
        await this.productsRepository.save(product)
        return product
    }

    async getById(id: number): Promise<ProductsEntity> {
        const product = await this.productsRepository
                            .createQueryBuilder()
                            .select()
                            .where('id = :id', { id })
                            .getOne()
        
        return product                    
    }

    async get(): Promise<ProductsEntity[]> {
        const products = await this.productsRepository
                            .createQueryBuilder('products')
                            .getMany()

        return products
    }

    async update(updateProductDto: UpdateProductDto, id: number): Promise<ProductsEntity> {
        const product = await this.getById(id)
        if (!product) {
            throw new NotFoundException('Product Not Found')
        }
        Object.assign(product, updateProductDto)
        await this.productsRepository.save(product)
        return product
    }

    async delete(id: number): Promise<any> {
        const product = await this.getById(id)
        if (!product) {
            throw new NotFoundException('Product Not Found')
        }

        await this.productsRepository.delete(product)
    }
}
