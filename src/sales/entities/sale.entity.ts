import { ProductEntity } from "src/product/entities/product.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('venta')
    export class SaleEntity {
    @PrimaryGeneratedColumn({name:"id_venta"})
    id: number;

    @Column({name:"id_products"})
    idProducts: number;

    @Column({name:"id_usuario"})
    idUsuario: number;

    @Column({name:"precio_venta"})
    precioVenta: number;

    @Column({name:"fecha_reserva", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaReserva: Date;

    @Column({name:"nombre_pasajero"})
    nombrePasajero: string;

    @ManyToOne(() => ProductEntity, product => product.ventas)
    @JoinColumn({ name: 'id_products' })
    productos: ProductEntity;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.ventas)
    @JoinColumn({ name: 'id_usuario' })
    usuarios: UsuarioEntity;
    }