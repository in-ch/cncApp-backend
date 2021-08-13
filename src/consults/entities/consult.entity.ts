import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Rooms } from 'src/rooms/entities/rooms.entity';

export enum familyRole {
  Together= 'Together',   // 동거
  Disabled = 'Disabled',  // 장애
  Dieased = 'Dieased',    // 질병 
}

registerEnumType(familyRole, { name: 'familyRole' });


@InputType("ConsultInputType",{ isAbstract: true })
@ObjectType()
@Entity()
export class Consult extends CoreEntity {

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

  @Column()
  @IsString()
  @Field(_ => String)
  method: string; // 상담 방법 

  @Column({nullable: true})
  // @IsString()
  @Field(_ => String, {nullable: true})
  acquisitionPath?: string; // 유입 경로 

  @Column({ type: 'enum', enum: familyRole, nullable: true })
  @Field(type => familyRole,{nullable: true})
  // @IsEnum(familyRole)
  fatherStatus: familyRole;     // 부의 가족사항


  @Column({ type: 'enum', enum: familyRole, nullable: true})
  @Field(type => familyRole, {nullable: true})
  // @IsEnum(familyRole)
  motherStatus: familyRole;     // 모의 가족 사항   

  @Column({ type: 'enum', enum: familyRole,nullable: true })
  @Field(type => familyRole, {nullable: true})
  // @IsEnum(familyRole)
  sibilingsStatus: familyRole;     // 형제 가족 사항  

  @Column({ type: 'enum', enum: familyRole,nullable: true })
  @Field(type => familyRole, {nullable: true})
  // @IsEnum(familyRole)
  sistersStatus: familyRole;     // 자매 가족 사항 

  @Column({ type: 'enum', enum: familyRole, nullable: true })
  @Field(type => familyRole, {nullable: true})
  // @IsEnum(familyRole)
  sonStatus: familyRole;     // 아들 가족 사항

  @Column({ type: 'enum', enum: familyRole, nullable: true })
  @Field(type => familyRole, {nullable: true})
  // @IsEnum(familyRole)
  daugtherStatus: familyRole;     // 딸 가족 사항
  
  @Column()
  @IsString()
  @Field(_ => String)
  marriedStatus: string;          // 결혼 상태 
  
  @Column()
  @IsNumber()
  @Field(_ => Number)
  furnitureType: number;          // 가구 유형
  
  @Column({nullable: true})
  // @IsString()
  @Field(_ => String, {nullable: true})
  Guaranteed: string;          // 보장 구분 
  
  @Column()
  @IsString()
  @Field(_ => String)
  monthlyIncome: string;          // 월 수익
     
  @Column()
  @IsString()
  @Field(_ => String)
  employment: string;          // 고용 형태

  @Column({nullable: true})
  // @IsString()
  @Field(_ => String, {nullable: true})
  apartResidential: string;          // 아파트 주거 상황 

  @Column({nullable: true})
  // @IsString()
  @Field(_ => String,{nullable: true})
  villaResidential: string;          // 빌라 주거 상황 

  @Column({nullable: true})
  // @IsString()
  @Field(_ => String,{nullable: true})
  efficiencyApartmentResidential: string;          // 오피스텔 주거 상황 

  @Column({nullable: true})
  // @IsString()
  @Field(_ => String,{nullable: true})
  oneRoomResidential: string;          // 원룸 주거 상황 

  @Column()
  @IsString()
  @Field(_ => String)
  problem: string;          // 주요 문제 

  @Field(_ => Boolean,  { defaultValue: false })
  @Column()
  @IsBoolean()
  isPaid: boolean;  // 결제 완료 여부 

  @Field(_ => Number, { defaultValue: 0 })
  @Column()
  @IsNumber()
  status: number;    // 상태 

  @ManyToOne(_ => User,user => user.consult, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;  // 신청한 유저 

  @OneToMany(_ => Rooms, rooms => rooms.consult, {onDelete:'CASCADE'})
  @Field(_ => [Rooms])
  rooms: Rooms[];  // 관련 채팅 방 
}
