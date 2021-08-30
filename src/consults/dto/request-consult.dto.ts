import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Consult } from '../entities/consult.entity';

@InputType()
export class RequestConsultInput extends PickType(Consult, [
    'title',
    'address',
    'history',
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
