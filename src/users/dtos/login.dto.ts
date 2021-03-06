import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['phone']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field(_ => String, { nullable: true })
  token?: string;
}
