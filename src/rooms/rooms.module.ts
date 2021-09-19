import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.services';
import { RoomsResolver } from './rooms.resolver';
import { Rooms } from './entities/rooms.entity';
import { User } from 'src/users/entities/user.entity';
import { Consult } from 'src/consults/entities/consult.entity';
import { UserService } from 'src/users/users.service';
import { Admin } from 'src/admin/entities/admin.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Rooms, User, Consult, Admin])],
    providers:[RoomsResolver, RoomsService],
    exports:[RoomsService],
})
export class RoomsModule {}
