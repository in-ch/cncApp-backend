import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription, Int } from '@nestjs/graphql';

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
        @Args('userNo', {type: () => Int}) userNo: number,
    ): Promise<RequestConsultOutput> {
        return await this.consultsService.requestConsult(requestConsultInput, userNo);
    }

    @Mutation(_ => UpdateConsultOutput)
    async updateConsult(
        @Args('consultNo', {type: () => Int}) consultNo: number,
        @Args('updateConsultInput') updateConsultInput: UpdateConsultInput,
    ): Promise<RequestConsultOutput> {
        return await this.consultsService.updateConsult(consultNo, updateConsultInput);
    }

    @Query(_ => [Consult])
    async loadConsultList(
        @Args('userNo', {type: () => Int}) userNo:number
    ) : Promise<Consult[]> {
        return await this.consultsService.loadConsultList(userNo);
    }
}