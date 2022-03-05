import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator'
import {
    OrderStatus,
    OrderType
} from '../enums'

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    order_code: string

    @IsNotEmpty()
    @IsEnum(OrderType, { each: true })
    readonly order_type: OrderType

    @IsArray()
    @IsOptional()
    products: string[]

    @IsNotEmpty()
    @IsEnum(OrderStatus, { each: true })
    readonly order_status: OrderStatus

    @IsNumber()
    @IsOptional()
    quantity: number

    @IsNumber()
    @IsOptional()
    total_price: number
}