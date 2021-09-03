import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';


@ObjectType()
export class SmsApi extends MutationOutput {
  token?: string;
  ok: boolean;
  error?: string;
}
