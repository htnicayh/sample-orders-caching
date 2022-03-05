import {
    IsArray,
    IsObject
} from 'class-validator'
import { PageMetaDto } from './page-meta.dto'

export class PageDto<T> {
    @IsArray()
    readonly data: T[]

    @IsObject()
    readonly meta: PageMetaDto

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data
        this.meta = meta
    }
}