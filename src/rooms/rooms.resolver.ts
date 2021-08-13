import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { CreateRoomInput, CreateRoomOutput } from './dtos/create-room.dto';
import { Rooms } from './entities/rooms.entity';
import {RoomsService} from './rooms.services';

@Resolver(_ => Rooms)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(_ => CreateRoomOutput)
  async createRoom(@Args('input') createRoomInput: CreateRoomInput): Promise<CreateRoomOutput> {

    return await this.roomsService.createRooms(createRoomInput);
  }
}
  
  
