import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-orders.dto';
import { UpdateOrderDto } from './dtos/update-orders.dto';
import { OrdersEntity } from '../entities/orders.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersEntity) private readonly ordersRepository: Repository<OrdersEntity>
    ) {}

    async create(ordersDto: CreateOrderDto): Promise<OrdersEntity> {
        const orders = this.ordersRepository.create(ordersDto)
        await this.ordersRepository.save(orders)
        return orders
    }

    async update(updateOrdersDto: UpdateOrderDto, id: number): Promise<OrdersEntity> {
        const order = await this.getOne(id)
        if (!order) {
            throw new NotFoundException('Order Not Found')
        } else {
            Object.assign(order, updateOrdersDto)
            await this.ordersRepository.save(order)
            return order
        }
    }

    async get(): Promise<OrdersEntity[]> {
        const orders = this.ordersRepository
                        .createQueryBuilder()
                        .select()
                        .getMany()
        return orders
    }

    async getOne(id: number): Promise<OrdersEntity> {
        const order = this.ordersRepository
                        .createQueryBuilder()
                        .select()
                        .where('id = :id', { id })
                        .getOne()

        return order
    }
    
    async delete(id: number): Promise<boolean> {
        let isRemove = false
        const order = await this.getOne(id)

        if (order) {
            await this.ordersRepository.delete(order)
            isRemove = true
        }

        return isRemove
    }
}
