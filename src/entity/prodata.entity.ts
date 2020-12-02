
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class productdata extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: string

    @Column()
    quantity: number

    @Column()
    price: number

    @Column({nullable:true})
    note: string   
    
    @OneToMany(type => product_log, producthis => producthis.id_product)
    producthis: product_log[];
}

@Entity()
export class product_log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_product:number

    @Column()
    quantity_updated: number

    @Column()
    sku_updated: string

    @Column()
    price_updated: number

    @Column({nullable:true})
    note_updated: string
     
    @CreateDateColumn()
    date_created : Date

    @ManyToOne(type => productdata, productdata => productdata.id)
    productdata : productdata;
}

