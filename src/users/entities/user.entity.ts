import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Rooms } from 'src/rooms/entity/rooms.entity';
import { Consult } from 'src/consults/entities/consult.entity';



@InputType("UserInputType",{ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Column()
  @Field(type => String)
  name: string;

  @Column({ select: false })
  @IsString()
  @Field(type => String)
  phone: string;


  @OneToMany(_=> Consult, consult=>consult.user)
  @Field(_ => [Consult])
  consult: Consult[];
  
  @OneToMany(_=> Rooms, rooms=>rooms.user)
  @Field(_ => [Rooms])
  rooms: Rooms[];

}
