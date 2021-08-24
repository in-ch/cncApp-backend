import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Rooms } from '../entities/rooms.entity';

@InputType()
export class CreateRoomInput extends PickType(Rooms, [
  'message',
  'isAdmin',
  // 'user', // token으로 알면 됨
  // 'consult',
  // 'to',
]) {
  @Field(_ => Int)
  toUserId: number;

  @Field(_ => Int)
  consultId: number;
  // @Field(_ => File)
  // file: File;
}

@ObjectType()
export class CreateRoomOutput extends MutationOutput {}
