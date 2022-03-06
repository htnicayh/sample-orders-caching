import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
    OFF_SET, 
    PageDto,
    PageMetaDto,
    PageOptionsDto,
    QueryOrderDto,
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
    ) {}

    private static getQuery(queryOrder: QueryOrderDto, queryOrders: SelectQueryBuilder<OrdersEntity>): SelectQueryBuilder<OrdersEntity> {
        let ordersQueryBuilder = queryOrders

        if (queryOrder.orderId) {
            ordersQueryBuilder = ordersQueryBuilder
                .where('orders.id = :id', {
                    id: queryOrder.orderId
                })
        }
        if (queryOrder.orderCode) {
            ordersQueryBuilder = ordersQueryBuilder
                .andWhere('orders.orderCode = :code', {
                    code: queryOrder.orderCode
                })
        }
        if (queryOrder.orderType) {
            ordersQueryBuilder = ordersQueryBuilder
                .andWhere('orders.orderType = :type', {
                    type: queryOrder.orderType
                })
        }
        if (queryOrder.orderStatus) {
            ordersQueryBuilder = ordersQueryBuilder
                .andWhere('orders.orderStatus = :status', {
                    status: queryOrder.orderStatus
                })
        }

        return ordersQueryBuilder
    }

    public async create(ordersDto: CreateOrderDto): Promise<OrdersEntity> {
        const newOrders = this.ordersRepository.create(ordersDto)
        await this.ordersRepository.save(newOrders)
        return newOrders
    }

    public async update(updateOrdersDto: UpdateOrderDto, id: number): Promise<OrdersEntity> {
        await this.ordersRepository.update(id, updateOrdersDto)
        const updateOrder = await this.ordersRepository.findOne(id)
        if (updateOrder) {
            updateOrder.updateAt = new Date()
            await this.ordersRepository.save(updateOrder)
            return updateOrder
        }
        throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND)
    }

    public async get(pageOptionsDto: PageOptionsDto, ordersQuery: QueryOrderDto): Promise<PageDto<OrdersEntity>> {
        const queryBuilder = this.ordersRepository.createQueryBuilder('orders')

        const ordersQueryBuilder = OrdersService.getQuery(ordersQuery, queryBuilder)

        ordersQueryBuilder
            .orderBy('id', pageOptionsDto._arrange || 'ASC')
            .skip(pageOptionsDto.offset || OFF_SET)
            .take(pageOptionsDto._size || SIZE)

        const count = await ordersQueryBuilder.getCount()
        const { entities } = await ordersQueryBuilder.getRawAndEntities()

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
            const orderDelete = await this.ordersRepository.delete(order)
            if (orderDelete.affected !== 1) {
                isRemove = false
            }
            isRemove = true
        }

        return isRemove
    }
}
