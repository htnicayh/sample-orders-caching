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
    readonly orderCode: string

    @IsOptional()
    @IsEnum(OrderType, { each: true })
    readonly orderType: OrderType

    @IsArray()
    @IsOptional()
    readonly products: string[]

    @IsOptional()
    @IsEnum(OrderStatus, { each: true })
    readonly orderStatus: OrderStatus

    @IsNumber()
    @IsOptional()
    readonly quantity: number

    @IsNumber()
    @IsOptional()
    readonly totalPrice: number
}