import { Type } from "class-transformer";
import {
    IsEnum,
    IsInt,
    IsOptional,
    Max,
    Min,
    IsString
} from 'class-validator'
import { Arrange } from "../enums";

export class PageOptionsDto {
    @IsEnum(Arrange)
    @IsOptional()
    readonly _arrange?: Arrange = Arrange.ASC

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly _page?: number

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    readonly _size?: number

    get offset(): number {
        return (this._page - 1) * this._size
    }
}