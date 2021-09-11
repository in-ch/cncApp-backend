import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum familyRole {
  동거= '동거',   // 동거
  장애 = '장애',  // 장애
  질병 = '질병',    // 질병 
}

registerEnumType(familyRole, { name: 'familyRole' });


@InputType("ConsultInputType",{ isAbstract: true })
@ObjectType()
@Entity()
export class Consult {
  @PrimaryGeneratedColumn()
  @Field(_ => Int)
  no: number;

  
  @Column()
  @IsString()
  @Field(_ => String)
  title: string;  // 상담 제목 
  
  @Column()
  @IsString()
  @Field(_ => String)
  address: string;  // 거주지 주소
  
  @Column()
  @IsString()
  @Field(_ => String)
  history: string; // 상담 이력
  
  @Column({nullable: true})
  // @IsString()
  @Field(_ => String, {nullable: true})
  acquisitionPath?: string; // 유입 경로 
  
  @Column({ nullable: true })
  @Field(type => String,{nullable: true})
  fatherStatus: string;     // 부의 가족사항
  
  @Column({ nullable: true})
  @Field(type => String, {nullable: true})
  motherStatus: string;     // 모의 가족 사항   
  
  @Column({nullable: true })
  @Field(type => String, {nullable: true})
  sibilingsStatus: string;     // 형제 가족 사항  
  
  @Column({nullable: true })
  @Field(type => String, {nullable: true})
  sistersStatus: string;     // 자매 가족 사항 
  
  @Column({ nullable: true })
  @Field(type => String, {nullable: true})
  sonStatus: string;     // 아들 가족 사항
  
  @Column({ nullable: true })
  @Field(type => String, {nullable: true})
  daugtherStatus: string;     // 딸 가족 사항
  
  @Column()
  @IsString()
  @Field(_ => String, {nullable: true})
  marriedStatus: string;          // 결혼 상태 
  
  @Column()
  @Field(_ => String, {nullable: true})
  @IsString()
  furnitureType: string;          // 가구 유형
  
  @Column()
  @IsString()
  @Field(_ => String)
  problem: string;          // 주요 문제 

  // @Field(_ => Boolean,  { defaultValue: false })
  // @Column()
  // @IsBoolean()
  // seeUser: boolean;  // 유저가 봤는 지 여부



  @Field(_ => Boolean,  { defaultValue: false })
  @Column()
  @IsBoolean()
  isPaid: boolean;  // 결제 완료 여부 
  
  @Field(_ => Int, { defaultValue: 0 })
  @Column()
  @IsNumber()
  status: number;    // 상태 
  
 
  // 유저가 봤는지 여부 new를 위해 넣음 .. 채팅을 입력하면 true로 바꾸기 

  // @Field(_ => Boolean, { defaultValue: false })
  // @Column()
  // @IsBoolean()
  // seeAdmin: boolean;    // 관리자가 봤는지 여부


  @ManyToOne(_ => User,user => user.consult, { onDelete: 'CASCADE' })
  @Field(_ => User)
  @JoinColumn()
  user: User;  // 신청한 유저 
  
  @OneToMany(_ => Rooms, rooms => rooms.consult, {onDelete:'CASCADE'})
  @Field(_ => [Rooms])
  rooms: Rooms[];  // 관련 채팅 방
   
  @CreateDateColumn()
  @Field(_ => Date)
  createdAt: Date;
  
  @UpdateDateColumn()
  @Field(_ => Date)
  updatedAt: Date;
}
