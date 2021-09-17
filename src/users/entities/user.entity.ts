import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { Consult } from 'src/consults/entities/consult.entity';



@InputType("UserInputType",{ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {

  @PrimaryGeneratedColumn()
  @Field(_ => Int)
  no: number;

  @Column()
  @Field(type => String)
  name: string;

  @Column()
  @IsString()
  @Field(type => String)
  phone: string;

  @Column()
  @IsString()
  @Field(type => String)
  birth: string;

  @Column()
  @IsString()
  @Field(type => String)
  history: string;

  @Column({nullable: true})
  @IsString()
  @Field(_ => String, {nullable: true})
  DeviceToken: string;

  @OneToMany(_=> Consult, consult=>consult.user)
  @Field(_ => [Consult])
  consult: Consult[];
  
  @OneToMany(_=> Rooms, rooms=>rooms.user)
  @Field(_ => [Rooms])
  rooms: Rooms[];

}
