import { LoginHistory } from "src/login/entities/login.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  nombre: string;

  @Column({ length: 30 })
  apellido: string;

  @Column()
  usuario: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  fec_naci: Date;

  @Column()
  rol: string;

  @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.usuario)
  loginHistories: LoginHistory[];
}
