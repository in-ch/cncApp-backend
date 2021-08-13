import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.services';
import { RoomsResolver } from './rooms.resolver';
import { Rooms } from './entities/rooms.entity';
import { User } from 'src/users/entities/user.entity';
import { Consult } from 'src/consults/entities/consult.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Rooms, User, Consult])],
    providers:[RoomsResolver, RoomsService],
    exports:[RoomsService],
})
export class RoomsModule {}
