import { CoreEntity } from './core.entity';
import {
    Column,
    Entity
} from 'typeorm';
import { OrderStatus, OrderType } from '../orders/enums/orders.enum';

@Entity('orders')
export class OrdersEntity extends CoreEntity {
    @Column()
    order_code: string

    @Column()
    order_type: OrderType

    @Column('text', { array: true })
    products: String[]

    @Column()
    order_status: OrderStatus

    @Column()
    quantity: number

    @Column()
    total_price: number
}