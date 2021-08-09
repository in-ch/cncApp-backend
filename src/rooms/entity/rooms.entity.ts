import {
    Field,
    InputType,
    ObjectType,
  } from '@nestjs/graphql';
  import { Column, Entity,  JoinColumn,  ManyToOne,  OneToOne } from 'typeorm';
  import { CoreEntity } from 'src/common/entities/core.entity';
  import { User } from 'src/users/entities/user.entity';
import { IsBoolean, IsString } from 'class-validator';
import { Consult } from 'src/consults/entities/consult.entity';
  
  
  
  @InputType("RoomsInputType",{ isAbstract: true })
  @ObjectType()
  @Entity()
  export class Rooms extends CoreEntity {

    @Column({ select: false })
    @IsString()
    @Field(type => String)
    text: string;

    @Column()
    @IsBoolean()
    @Field(_ => Boolean)
    isAdmin: boolean;

    @ManyToOne(_ => User, user => user.rooms ,{ onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;   // 보낸 유저

    @ManyToOne(_ => User, user => user.rooms ,{ onDelete: 'CASCADE' })
    @JoinColumn()
    to: User;   // 수신자


    @ManyToOne(_ => Consult, consult => consult.rooms , { onDelete: 'CASCADE'})
    @JoinColumn()
    consult : Consult;  // 컨설팅 아이디
  }
  