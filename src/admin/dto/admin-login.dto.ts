import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class AdminLoginOutput extends MutationOutput {
}
