import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt?: string;

    @UpdateDateColumn()
    updatedAt?: string;

    constructor(infoDate: Item) {
        this.id = infoDate?.id;
        this.name = infoDate?.name;
        this.price = infoDate?.price;
    }
}
