import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { ProductsEntity } from '../entities';
import {
    CreateProductDto,
    UpdateProductDto
} from './dtos';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
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
        const product = await this.productsService.getOne(+id)
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
