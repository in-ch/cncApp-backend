import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './entity/rooms.entity';
import { CreateRoomInput } from './dtos/create-room.dto';


@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms) private readonly rooms: Repository<Rooms>,
  ) {}

  async createRooms(createRoomInput: CreateRoomInput): Promise<{ ok: boolean; error?: string }> {
    try {
        const newRooms = this.rooms.create(createRoomInput);
        await this.rooms.save(newRooms);

      return { ok: true };
    } catch (e) {
      return { ok: false, error: "채팅방 생성이 불가합니다." };
    }
  }
}
