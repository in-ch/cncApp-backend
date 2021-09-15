import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription, Int } from '@nestjs/graphql';

import { RequestConsultInput, RequestConsultOutput } from './dto/request-consult.dto';
import { Consult } from './entities/consult.entity';
import { ConsultService } from './consults.service';
import { UpdateConsultInput, UpdateConsultOutput } from './dto/update-consult.dto';
import { SeeUserOutput } from './dto/see-user.dto';
import { SeeWhenSendMessageOutput } from './dto/see-Whensend.dto';

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

    @Mutation(_ => SeeUserOutput)  // 유저가 봤나? 이벤트
    async seeUser(
        @Args('consultNo', {type: () => Int}) consultNo: number,
    ): Promise<SeeUserOutput> {
        return await this.consultsService.seeUser(consultNo);
    }

    @Mutation(_ => SeeUserOutput)  // 어드민이 봤나? 이벤트
    async seeAdmin(
        @Args('consultNo', {type: () => Int}) consultNo: number,
    ): Promise<SeeUserOutput> {
        return await this.consultsService.seeAdmin(consultNo);
    }

    @Mutation(_ => SeeWhenSendMessageOutput)  // 유저나 어드민이 메시지를 보냈을 때 see이벤트
    async seeWhenSendMessage(
        @Args('consultNo', {type: () => Int}) consultNo: number,
        @Args('isUser', {type: () => Boolean}) isUser: boolean,
    ): Promise<SeeWhenSendMessageOutput> {
        return await this.consultsService.seeWhenSendMessage(consultNo, isUser);
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