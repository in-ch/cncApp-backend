import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Consult } from '../entities/consult.entity';

@InputType()
export class UpdateConsultInput extends PartialType(PickType(Consult, [
    'title',
    'address',
    'history',
    'method',
    'acquisitionPath',    
    'fatherStatus',
    'motherStatus',
    'sibilingsStatus',
    'sistersStatus',
    'sonStatus',
    'daugtherStatus',
    'marriedStatus',
    'furnitureType',
    'Guaranteed',
    'monthlyIncome',
    'apartResidential',
    'villaResidential',
    'efficiencyApartmentResidential',
    'oneRoomResidential',
    'problem',
    'employment',
    'isPaid',
    'status',
])
 ) {}

@ObjectType()
export class UpdateConsultOutput extends MutationOutput {}
