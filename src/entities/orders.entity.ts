import { OrderStatus, OrderType } from '../orders/enums/orders.enum';
import {
    Column,
    Entity,
    CreateDateColumn
} from 'typeorm';
import { CoreEntity } from './core';

@Entity('orders')
export class OrdersEntity extends CoreEntity {
    @Column({ name: 'order_code' })
    public orderCode: string

    @Column({
        type: 'enum',
        enum: OrderType,
        default: OrderType.furniture,
        name: 'order_type'
    })
    public orderType: OrderType

    @Column('text', { array: true })
    public products: string[]

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.pending,
        name: 'order_status'
    })
    public orderStatus: OrderStatus

    @Column()
    public quantity: number

    @Column({ name: 'total_price' })
    public totalPrice: number

    @CreateDateColumn({ 
        name: 'create_at', 
        type: 'timestamp' 
    })
    public createAt: Date

    @CreateDateColumn({ 
        name: 'update_at', 
        type: 'timestamp' 
    })
    public updateAt: Date
}