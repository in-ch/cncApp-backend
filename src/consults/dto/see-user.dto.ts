import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Consult } from '../entities/consult.entity';

@InputType()
export class SeeUserInput extends PartialType(PickType(Consult, [
    'userSee',
])
 ) {}

@ObjectType()
export class SeeUserOutput extends MutationOutput {
}
