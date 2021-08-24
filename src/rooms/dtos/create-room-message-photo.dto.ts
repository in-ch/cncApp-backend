import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Rooms } from '../entities/rooms.entity';

@InputType()
export class CreateRoomMessagePhotoInput extends PickType(Rooms, [
  'isAdmin',
  // 'user', // token으로 알면 됨
  'file',
]) {
  @Field(_ => Int)
  toUserId: number;

  @Field(_ => Int)
  consultId: number;
}

@ObjectType()
export class CreateRoomMessagePhotoOutput extends MutationOutput {}
