import {
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, SelectQueryBuilder } from 'typeorm';
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


    // Caching Daily & Get Daily Report
    /*
        @params startDate
        @params endDate
        @body reportDate
        @return ordersReport
                mostBuyProducts
                numberOfProducts
    */

    public async queryDailyReport(reportDate: string): Promise<string> {
        const begin = `${reportDate} 00:00:00`
        const end = `${reportDate} 23:59:59`

        // this.customLogger.debug(`${JSON.stringify(reportDate)}`, 'OrdersService')

        const ordersQueryBuilder = this.ordersRepository.createQueryBuilder('orders')

        const ordersReport = await ordersQueryBuilder
                                    .select('SUM(orders.totalPrice)', 'total_price')
                                    .addSelect('COUNT(orders.orderCode)', 'number_orders')
                                    .where(`orders.updateAt BETWEEN '${begin}' AND '${end}'`)
                                    .getRawOne();

        const joinTable = ordersQueryBuilder
                            .select('*')
                            .innerJoin('products', 'products', 'products.product_code = ANY(orders.products)')
                            .where(`update_at BETWEEN '${begin}' AND '${end}'`)
                            

        const numberOfProducts = await getManager().createQueryBuilder()
                                    .select('SUM(quantity)', 'total_products')
                                    .from('(' + joinTable.getQuery() + ')', 'products_orders')
                                    .getRawMany()
        
        const quantityByProducts = getManager()
                                    .createQueryBuilder()
                                    .select('product_code', 'product_code')
                                    .addSelect('SUM(quantity)', 'sum_quantity')
                                    .from('(' + joinTable.getQuery() + ')', 'joinTable')
                                    .groupBy('product_code')

        const mostBuyProducts =  getManager().createQueryBuilder()
                                        .select('*')
                                        .select('product_code', 'product_code')
                                        .addSelect('MAX(sum_quantity)', 'max_quantity')
                                        .from('(' + quantityByProducts.getQuery() + ')', 'quantityByProducts')
                                        .groupBy('product_code')
                                        .limit(1)
                                        
                                        
        const mostProducts = await mostBuyProducts.getRawOne()

        const reportDaily = {
            ...ordersReport,
            ...numberOfProducts[0],
            ...mostProducts
        }

        // console.log('Debug - ', reportDaily)

        return reportDaily
    }
}
