import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.services';
import { RoomsResolver } from './rooms.resolver';
import { Rooms } from './entities/rooms.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Rooms])],
    providers:[RoomsResolver, RoomsService],
    exports:[RoomsService],
})
export class RoomsModule {}
