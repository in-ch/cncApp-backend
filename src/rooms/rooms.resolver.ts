import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Subscription} from '@nestjs/graphql';
import { CreateRoomMessagePhotoInput } from './dtos/create-room-message-photo.dto';
import { CreateRoomInput, CreateRoomOutput } from './dtos/create-room.dto';
import { Rooms } from './entities/rooms.entity';
import {RoomsService} from './rooms.services';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(_ => Rooms)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(_ => Rooms)
  async createRoom(@Args('input') createRoomInput: CreateRoomInput): Promise<Rooms> {
    const result = await this.roomsService.createRooms(createRoomInput);
    pubSub.publish('roomAdded',{roomAdded: result});  
    return result;
  }

  @Mutation(_ => Rooms)
  async createRoomMessagePhoto(@Args('input') createRoomMessagePhoto: CreateRoomMessagePhotoInput): Promise<Rooms> {
    const result =  await this.roomsService.createRoomMessagePhoto(createRoomMessagePhoto);
    pubSub.publish('roomAdded',{roomAdded: result});  
    return result;
  }
  
  @Query(_ => [Rooms])
  async loadRooms(
      @Args('consultNo', {type: () => Int}) consultNo:number
  ) : Promise<Rooms[]> {
      return await this.roomsService.loadRooms(consultNo);
  }

  @Subscription(()=>Rooms)
  roomAdded() {
      return pubSub.asyncIterator('roomAdded');
  }
}
  
  
