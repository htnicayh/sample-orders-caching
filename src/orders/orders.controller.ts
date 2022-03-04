import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { OrdersEntity } from '../entities/orders.entity';
import { CreateOrderDto } from './dtos/create-orders.dto';
import { UpdateOrderDto } from './dtos/update-orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService
    ) {}

    @Get()
    async get(): Promise<OrdersEntity[]> {
        const results = await this.ordersService.get()
        return results
    }

    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<OrdersEntity> {
        const result = await this.ordersService.getOne(+id)
        return result
    }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<OrdersEntity> {
        const newOrder = await this.ordersService.create(createOrderDto)
        return newOrder
    }

    @Put('/:id')
    async update(@Body() updateOrderDto: UpdateOrderDto, @Param('id') id: string): Promise<OrdersEntity> {
        const updateOrder = await this.ordersService.update(updateOrderDto, +id)
        return updateOrder
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<boolean> {
        const isRemove = await this.ordersService.delete(+id)
        return isRemove
    }
}
