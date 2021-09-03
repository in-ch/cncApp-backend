import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user.entity';

@InputType()
export class CompareCodeInput extends PickType(Auth, [
  'phone',
  'token',
]) {}

@ObjectType()
export class CompareCodeOutput extends MutationOutput {
}
