import { IsString, IsNumber, MinLength, MaxLength, Min } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @MaxLength(20)
    @MinLength(0)
    product_code: string

    @IsString()
    @MinLength(0)
    product_name: string

    @IsNumber()
    @Min(0)
    price: number
}