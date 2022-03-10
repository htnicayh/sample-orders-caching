import { IsString, IsNumber, MinLength, MaxLength, Min } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @MaxLength(20)
    @MinLength(0)
    productCode: string

    @IsString()
    @MinLength(0)
    productName: string

    @IsNumber()
    @Min(0)
    price: number
}