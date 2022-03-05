import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    OFF_SET, 
    PageDto,
    PageMetaDto,
    PageOptionsDto,
    SIZE
} from '../commons';
import { OrdersEntity } from '../entities';
import { CustomLogger } from '../logger/logger.service';
import {
    CreateOrderDto,
    UpdateOrderDto
} from './dtos';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersEntity) private readonly ordersRepository: Repository<OrdersEntity>,
        private readonly customLogger: CustomLogger
    ) {
        
    }

    public async create(ordersDto: CreateOrderDto): Promise<OrdersEntity> {
        const orders = this.ordersRepository.create(ordersDto)
        await this.ordersRepository.save(orders)
        return orders
    }

    public async update(updateOrdersDto: UpdateOrderDto, id: number): Promise<OrdersEntity> {
        const order = await this.getOne(id)
        if (!order) {
            throw new NotFoundException('Order Not Found')
        } else {
            Object.assign(order, updateOrdersDto)
            await this.ordersRepository.save(order)
            return order
        }
    }

    public async get(pageOptionsDto: PageOptionsDto): Promise<PageDto<OrdersEntity>> {
        const queryBuilder = this.ordersRepository.createQueryBuilder('orders')

        this.customLogger.debug(`${JSON.stringify(pageOptionsDto)}`, 'OrdersService')
        this.customLogger.debug(`${JSON.stringify(await queryBuilder.getRawAndEntities())}`, 'OrdersService')

        queryBuilder
            .orderBy('orders.id', pageOptionsDto._arrange || 'ASC')
            .skip(pageOptionsDto.offset || OFF_SET)
            .take(pageOptionsDto._size || SIZE)
            .select()
        
        if (pageOptionsDto.order_id) {
            queryBuilder
                .andWhere('orders.id = :id', { id: pageOptionsDto.order_id })
        }
        if (pageOptionsDto.order_code) {
            queryBuilder
                .andWhere('orders.order_code = :code', { code: pageOptionsDto.order_code })
        }
        if (pageOptionsDto.order_type) {
            queryBuilder
                .andWhere('orders.order_type = :type', { type: pageOptionsDto.order_type })
        }
        if (pageOptionsDto.order_status) {
            queryBuilder
                .andWhere('orders.order_status = :status', { status: pageOptionsDto.order_status })
        }

        queryBuilder.execute()

        const count = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ count, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }

    public async getOne(id: number): Promise<OrdersEntity> {
        const order = this.ordersRepository
                        .createQueryBuilder()
                        .select()
                        .where('id = :id', { id })
                        .getOne()
        return order
    }
    
    public async delete(id: number): Promise<boolean> {
        let isRemove = false
        const order = await this.getOne(id)

        if (order) {
            await this.ordersRepository.delete(order)
            isRemove = true
        }

        return isRemove
    }
}
