import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Rooms } from '../entities/rooms.entity';

@InputType()
export class CreateRoomInput extends PickType(Rooms, [
  'message',
  'isAdmin',
  // 'user',
  // 'consult',
  // 'to',
]) {}

@ObjectType()
export class CreateRoomOutput extends MutationOutput {}
