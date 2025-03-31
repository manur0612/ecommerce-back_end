import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('login_history')
export class LoginHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"fecha_login", type: 'timestamp' })
  fechaLogin: Date;

  @Column({name:"id_usuario"})
  idUsuario: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.loginHistories)
  @JoinColumn({ name: 'id_usuario' })
  usuarios: UsuarioEntity;
}