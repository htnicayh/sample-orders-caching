import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('products')
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_code: string

    @Column()
    product_name: string

    @Column()
    price: number
}
