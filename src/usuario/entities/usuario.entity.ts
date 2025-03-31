import { LoginHistory } from "src/login/entities/login.entity";
import { SaleEntity } from "src/sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 20 })
  nombre: string;

  @Column({ length: 30 })
  apellido: string;

  @Column()
  usuario: string;

  @Column()
  password: string;

  @Column({name:"fec_naci", type: 'date' })
  fechaNacimiento: Date;

  @Column()
  rol: string;

  @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.usuarios)
  loginHistories: LoginHistory[];

  @OneToMany(() => SaleEntity, loginHistory => loginHistory.usuarios)
  ventas: SaleEntity[];
}
