import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';


@Entity('role')
export class Role {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;


  @OneToMany(() => User, user => user.role)
  users: User[];
}