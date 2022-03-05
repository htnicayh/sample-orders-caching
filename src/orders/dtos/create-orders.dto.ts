import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator'
import {
    OrderStatus,
    OrderType
} from '../enums'


export class CreateOrderDto {
    @IsString()
    order_code: string

    @IsNotEmpty()
    @IsEnum(OrderType)
    order_type: OrderType

    @IsArray()
    products: string[]

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    order_status: OrderStatus

    @IsNumber()
    quantity: number

    @IsNumber()
    total_price: number
}