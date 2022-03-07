import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { 
    PageDto, 
    PageOptionsDto, 
    QueryOrderDto
} from '../commons';
import { OrdersEntity } from '../entities';
import { 
    CreateOrderDto, 
    UpdateOrderDto 
} from './dtos';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService
    ) {}

    @Get()
    public async get(@Query() pageOptionsDto: PageOptionsDto, @Query() ordersQuery: QueryOrderDto): Promise<PageDto<OrdersEntity>> {
        const results = await this.ordersService.get(pageOptionsDto, ordersQuery)
        return results
    }

    @Get('/:id')
    public async getOne(@Param('id') id: string): Promise<OrdersEntity> {
        const result = await this.ordersService.getOne(+id)
        return result
    }

    @Post()
    public async create(@Body() createOrderDto: CreateOrderDto): Promise<OrdersEntity> {
        const newOrder = await this.ordersService.create(createOrderDto)
        return newOrder
    }

    @Put('/:id')
    public async update(@Body() updateOrderDto: UpdateOrderDto, @Param('id') id: string): Promise<OrdersEntity> {
        const updateOrder = await this.ordersService.update(updateOrderDto, +id)
        return updateOrder
    }

    @Delete('/:id')
    public async delete(@Param('id') id: string): Promise<boolean> {
        const isRemove = await this.ordersService.delete(+id)
        return isRemove
    }
}
