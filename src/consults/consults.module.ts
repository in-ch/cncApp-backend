import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/users/entities/user.entity';
import { ConsultResolver } from './consults.resolver';
import { ConsultService } from './consults.service';
import { Consult } from './entities/consult.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Consult, User,Admin])],
    providers:[ConsultResolver, ConsultService],
    exports:[ConsultService]
})

export class ConsultsModule {}
