import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Admin } from '../entities/admin.entity';

@InputType()
export class SetStatusInput extends PickType(Admin, [
    'status',
]) {}

@ObjectType()
export class SetStatusOutput extends MutationOutput {}
