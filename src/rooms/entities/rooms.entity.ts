import {
    Field,
    InputType,
    Int,
    ObjectType,
  } from '@nestjs/graphql';
  import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
  import { User } from 'src/users/entities/user.entity';
import { IsBoolean, IsString } from 'class-validator';
import { Consult } from 'src/consults/entities/consult.entity';
  
  
  
  @InputType("RoomsInputType",{ isAbstract: true })
  @ObjectType()
  @Entity()
  export class Rooms{

    @PrimaryGeneratedColumn()
    @Field(_ => Int)
    no: number;

    @Column({nullable: true})
    @IsString()
    @Field(_ => String, {nullable: true})
    message: string;

    @Column()
    @IsBoolean()
    @Field(_ => Boolean)
    isAdmin: boolean;

    @Column({nullable: true})
    @IsString()
    @Field(_ => String, {nullable: true})
    file: string;

    @ManyToOne(_ => User, user => user.rooms ,{ onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;   // 보낸 유저

    @ManyToOne(_ => User, user => user.rooms ,{ onDelete: 'CASCADE' })
    @JoinColumn()
    to: User;   // 수신자

    @ManyToOne(_ => Consult, consult => consult.rooms , { onDelete: 'CASCADE'})
    @JoinColumn()
    consult : Consult;  // 컨설팅 아이디

    @CreateDateColumn()
    @Field(_ => Date)
    createdAt: Date;
    
    @UpdateDateColumn()
    @Field(_ => Date)
    updatedAt: Date;
  }
  