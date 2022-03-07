import {
    IsOptional,
    IsString
} from 'class-validator'
import { Type } from 'class-transformer'

export class QueryOrderDto {
    @Type(() => Number)
    @IsOptional()
    readonly orderId?: number

    @IsString()
    @IsOptional()
    readonly orderCode?: string

    @IsString()
    @IsOptional()
    readonly orderType?: string

    @IsString()
    @IsOptional()
    readonly orderStatus?: string
}