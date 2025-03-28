import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('login_history')
export class LoginHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha_login: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.loginHistories)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioEntity;
}
