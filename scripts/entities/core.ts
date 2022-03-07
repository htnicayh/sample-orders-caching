import { PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class CoreEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number
}