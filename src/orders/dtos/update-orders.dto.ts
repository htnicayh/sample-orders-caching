import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator'
import { OrderStatus, OrderType } from '../enums/orders.enum'

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    order_code: string

    @IsString()
    @IsOptional()
    order_type: OrderType

    @IsArray()
    @IsOptional()
    products: String[]

    @IsString()
    @IsOptional()
    order_status: OrderStatus

    @IsNumber()
    @IsOptional()
    quantity: number

    @IsNumber()
    @IsOptional()
    total_price: number
}