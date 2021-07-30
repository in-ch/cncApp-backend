import {
    Field,
    InputType,
    ObjectType,
  } from '@nestjs/graphql';
  import { Column, Entity,  JoinColumn,  ManyToOne,  OneToOne } from 'typeorm';
  import { CoreEntity } from 'src/common/entities/core.entity';
  import { User } from 'src/users/entities/user.entity';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Consult } from 'src/consults/entities/consult.entity';
  
  
  
  @InputType("RoomsInputType",{ isAbstract: true })
  @ObjectType()
  @Entity()
  export class Admin extends CoreEntity {
    
    @Column()
    @IsString()
    @Field(_ => String)
    id: string; 

    @Column()
    @IsString()
    @Field(_ => String)
    password: string; 

    @Column()
    @IsString()
    @Field(_ => String)
    name: string;

    @Column()
    @IsNumber()
    @Field(_ => Number)
    status: number;
  }