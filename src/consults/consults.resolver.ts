import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';

import { RequestConsultInput, RequestConsultOutput } from './dto/request-consult.dto';
import { Consult } from './entities/consult.entity';
import { ConsultService } from './consults.service';
import { UpdateConsultInput, UpdateConsultOutput } from './dto/update-consult.dto';

@Resolver(_ => Consult)
export class ConsultResolver {
  constructor(private readonly consultsService: ConsultService) {}

  
    @Mutation(_ => RequestConsultOutput)
    async requestConsult(
        @Args('input') requestConsultInput: RequestConsultInput,
    ): Promise<RequestConsultOutput> {
        return await this.consultsService.requestConsult(requestConsultInput);
    }

    @Mutation(_ => UpdateConsultOutput)
    async updateConsult(
        @Args('consultNo') consultNo: number,
        @Args('updateConsultInput') updateConsultInput: UpdateConsultInput,
    ): Promise<RequestConsultOutput> {
        return await this.consultsService.updateConsult(consultNo, updateConsultInput);
    }
}