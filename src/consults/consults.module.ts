import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consult } from './entities/consult.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Consult])],
    providers:[],
    exports:[]
})

export class ConsultsModule {}
