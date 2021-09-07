import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription, Int } from '@nestjs/graphql';

import { RequestConsultInput, RequestConsultOutput } from './dto/request-consult.dto';
import { Consult } from './entities/consult.entity';
import { ConsultService } from './consults.service';
import { UpdateConsultInput, UpdateConsultOutput } from './dto/update-consult.dto';

@Resolver(_ => Consult)
export class ConsultResolver {
  constructor(private readonly consultsService: ConsultService) {}

    @Mutation(_ => Consult)
    async requestConsult(
        @Args('input') requestConsultInput: RequestConsultInput,
        @Args('userNo', {type: () => Int}) userNo: number,
    ): Promise<Consult> {
        return await this.consultsService.requestConsult(requestConsultInput, userNo);
    }

    @Mutation(_ => UpdateConsultOutput)
    async updateConsult(
        @Args('consultNo', {type: () => Int}) consultNo: number,
        @Args('updateConsultInput') updateConsultInput: UpdateConsultInput,
    ): Promise<RequestConsultOutput> {
        return await this.consultsService.updateConsult(consultNo, updateConsultInput);
    }

    @Mutation(_ => UpdateConsultOutput)  // 결제 완료 이벤트
    async paidDone(
        @Args('consultNo', {type: () => Int}) consultNo: number,
        @Args('status', {type: () => Int}) status: number,
    ): Promise<RequestConsultOutput> {
        return await this.consultsService.paidDone(consultNo, status);
    }
    
    @Mutation(_ => Consult)  // 상담 id를 통해 상담서 정보 가져오기 
    async loadConsultData(
        @Args('consultNo', {type: () => Int}) consultNo: number,
    ): Promise<Consult> {
        return await this.consultsService.loadConsultData(consultNo);
    }

    @Query(_ => [Consult])
    async loadConsultList(
        @Args('userNo', {type: () => Int}) userNo:number
    ) : Promise<Consult[]> {
        return await this.consultsService.loadConsultList(userNo);
    }

    @Query(_ => [Consult])
    async loadConsultListAll(
    ) : Promise<Consult[]> {
        return await this.consultsService.loadConsultListAll();
    }
}