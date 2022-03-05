import {
    Column,
    Entity
} from 'typeorm'
import { CoreEntity } from './core'

@Entity('products')
export class ProductsEntity extends CoreEntity {
    @Column()
    product_code: string

    @Column()
    product_name: string

    @Column()
    price: number
}
