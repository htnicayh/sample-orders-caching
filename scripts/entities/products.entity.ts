import {
    Column, Entity
} from 'typeorm'
import { CoreEntity } from './core'

@Entity('products')
export class ProductsEntity extends CoreEntity {
    @Column({ name: 'product_code' })
    public productCode: string

    @Column({ name: 'product_name' })
    public productName: string

    @Column()
    public price: number
}
