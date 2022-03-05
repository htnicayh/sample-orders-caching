import { PageMetaInterface } from "../interfaces"
import {
    IsNumber,
    IsBoolean
} from 'class-validator'

export class PageMetaDto {
    @IsNumber()
    readonly _page: number

    @IsNumber()
    readonly _size: number

    @IsNumber()
    readonly _count: number

    @IsNumber()
    readonly _pageCount: number

    @IsBoolean()
    readonly _hasPreviosPage: boolean

    @IsBoolean()
    readonly _hasNextPage: boolean

    constructor({ pageOptionsDto: { _page, _size }, count }: PageMetaInterface) {
        this._page = _page
        this._size = _size
        this._count = count
        this._pageCount = Math.ceil(this._count / this._size)
        this._hasPreviosPage = this._page > 1
        this._hasNextPage = this._page < this._pageCount
    }
}