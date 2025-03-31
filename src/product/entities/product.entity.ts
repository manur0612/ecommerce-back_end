import { SaleEntity } from "src/sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";

@Entity('products')
    export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:"name_product"})
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({name:"img_url"})
    imgUrl: string;

    @Column({name:"is_oferta"})
    isOferta: boolean;

    @Column({name:"porcentaje_oferta"})
    porcentajeOferta: number;

    @Column({name:"final_price", type: "float", nullable: true})
    finalPrice: number;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => SaleEntity, detalleVenta => detalleVenta.productos)
    ventas: SaleEntity[];

    }