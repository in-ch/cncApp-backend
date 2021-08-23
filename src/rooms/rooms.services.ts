import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './entities/rooms.entity';
import { CreateRoomInput } from './dtos/create-room.dto';
import { User } from 'src/users/entities/user.entity';
import { Consult } from 'src/consults/entities/consult.entity';


@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms) private readonly rooms: Repository<Rooms>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Consult) private readonly consults: Repository<Consult>,
    
  ) {}
  async loadRooms(userNo:number, consultNo:number): Promise<Rooms[]> {
    try {
      const rooms = await this.rooms.find({
        where: {
          user:{
            no:userNo
          },
          consult: {
            no:consultNo
          }
        }
      });
      return rooms;
    } catch (error) {
      throw error;
    }
  }

  async createRooms(createRoomInput: CreateRoomInput): Promise<Rooms> {
      try {
        const { toUserId, message, isAdmin, consultId } = createRoomInput;
        const userId = 1;
        const to = await this.users.findOne(toUserId);
        const user = await this.users.findOne(userId);
        const consult = await this.consults.findOne(consultId);

        const newRooms = this.rooms.create({
          user,
          to,
          message,
          isAdmin,
          consult
        });
        return this.rooms.save(newRooms); 
    } catch (error) {
      throw error;
    }
  }
}
