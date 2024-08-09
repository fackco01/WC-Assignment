import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({unique: true})
  phone: string;

  @Column()
  roleId: number;

  @Column({default: true})
  isActive: boolean;


  @OneToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role
}