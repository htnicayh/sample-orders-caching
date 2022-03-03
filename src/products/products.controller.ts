import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductsEntity } from '../entities/products.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject(forwardRef(() => ProductsService)) private readonly productsService: ProductsService
    ) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductsEntity> {
        const results = await this.productsService.create(createProductDto)
        return results
    }

    @Get()
    async get(): Promise<ProductsEntity[]> {
        const results = await this.productsService.get()
        return results
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<ProductsEntity> {
        const product = await this.productsService.getById(parseInt(id))
        return product
    }

    @Put('/:id')
    async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<ProductsEntity> {
        const product = await this.productsService.update(updateProductDto, +id)
        return product
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<any> {
        const results = await this.productsService.delete(parseInt(id))
        return results
    }
}