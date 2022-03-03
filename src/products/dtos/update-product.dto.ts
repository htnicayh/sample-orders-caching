import { IsString, IsNumber } from 'class-validator'

export class UpdateProductDto {
    @IsString()
    product_code: string

    @IsString()
    product_name: string

    @IsNumber()
    price: number
}