import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Auth extends CoreEntity {
  @Column()
  @IsString()
  @Field(_ => String)
  token: string;

  @Column({ select: false })
  @IsString()
  @Field(_ => String)
  phone: string;
}