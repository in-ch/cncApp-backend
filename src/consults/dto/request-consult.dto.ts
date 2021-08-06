import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { title } from 'process';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Consult } from '../entities/consult.entity';

@InputType()
export class RequestConsultInput extends PickType(Consult, [
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
]) {}

@ObjectType()
export class RequestConsultOutput extends MutationOutput {}
