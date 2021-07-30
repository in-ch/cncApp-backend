import {
  Field,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Rooms } from 'src/rooms/entity/rooms.entity';



@InputType("ConsultInputType",{ isAbstract: true })
@ObjectType()
@Entity()
export class Consult extends CoreEntity {

  @Column()
  @IsString()
  @Field(_ => String)
  title: string;

  @Column()
  @IsString()
  @Field(_ => String)
  content: string;

  @Column()
  @IsDate()
  @Field(_ => Date)
  time: Date

  @Column()
  @IsBoolean()
  @Field(_ => Boolean)
  isPaid: boolean

  @Column()
  @IsString()
  @Field(_ => String)
  files: string

  @Column()
  @IsNumber()
  @Field(_ => Number)
  status: number

  @ManyToOne(_ => User,user => user.consult, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(_ => Rooms, rooms => rooms.consult, {onDelete:'CASCADE'})
  @Field(_ => [Rooms])
  rooms: Rooms[];
}
