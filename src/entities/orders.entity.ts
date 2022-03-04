import { OrderStatus, OrderType } from 'src/orders/enums/orders.enum';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('orders')
export class OrdersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order_code: string

    @Column({
        type: 'enum',
        enum: OrderType,
        default: OrderType.furniture
    })
    order_type: OrderType

    @Column('text', { array: true })
    products: string[]

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.pending
    })
    order_status: OrderStatus

    @Column()
    quantity: number

    @Column()
    total_price: number
}