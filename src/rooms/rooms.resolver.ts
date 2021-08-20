import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
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

  @Query(_ => [Rooms])
  async loadRooms(
      @Args('userNo', {type: () => Int}) userNo:number,
      @Args('consultNo', {type: () => Int}) consultNo:number
  ) : Promise<Rooms[]> {
      return await this.roomsService.loadRooms(userNo, consultNo);
  }
}
  
  
