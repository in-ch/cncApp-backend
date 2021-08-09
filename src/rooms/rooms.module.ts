import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.services';
import { RoomsResolver } from './rooms.resolver';
@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers:[RoomsResolver, RoomsService],
    exports:[],
})
export class RoomsModule {}
