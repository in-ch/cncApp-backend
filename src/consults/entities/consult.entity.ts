import {
  Field,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { Column, Entity,  JoinColumn,  OneToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';



@InputType("ConsultInputType",{ isAbstract: true })
@ObjectType()
@Entity()
export class Consult extends CoreEntity {

  @Column()
  @Field(_ => String)
  title: string;

  @Column()
  @Field(_ => String)
  content: string;

  @Column()
  @Field(_ => Date)
  time: Date

  @Column()
  @Field(_ => Boolean)
  isPaid: boolean

  @Column()
  @Field(_ => String)
  files: string

  @Column()
  @Field(_ => Number)
  status: number

  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
