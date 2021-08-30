import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConsultResolver } from './consults.resolver';
import { ConsultService } from './consults.service';
import { Consult } from './entities/consult.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Consult, User])],
    providers:[ConsultResolver, ConsultService],
    exports:[ConsultService]
})

export class ConsultsModule {}
