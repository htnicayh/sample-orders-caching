import { OrderStatus, OrderType } from "../enums/orders.enum"
import {
    IsString,
    IsNumber
} from 'class-validator'

export class CreateOrderDto {
    @IsString()
    order_code: string

    order_type: OrderType

    @IsString()
    products: string[]

    order_status: OrderStatus

    @IsNumber()
    quantity: number

    @IsNumber()
    total_price: number
}