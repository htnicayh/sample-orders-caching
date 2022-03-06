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
    readonly orderCode: string

    @IsNotEmpty()
    @IsEnum(OrderType)
    readonly orderType: OrderType

    @IsArray()
    readonly products: string[]

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    readonly orderStatus: OrderStatus

    @IsNumber()
    readonly quantity: number

    @IsNumber()
    readonly totalPrice: number
}