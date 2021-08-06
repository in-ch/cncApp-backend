import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { RequestConsultInput } from './dto/request-consult.dto';
import { UpdateConsultInput } from './dto/update-consult.dto';
import { Consult } from './entities/consult.entity';

@Injectable()
export class ConsultService {
  constructor(
    @InjectRepository(Consult) private readonly consults: Repository<Consult>,
  ) {}

  async requestConsult(requestConsultInput: RequestConsultInput): Promise<{ ok: boolean; error?: string }> {
    try {
        const newConsult = this.consults.create(requestConsultInput);
        await this.consults.save(newConsult);
        return {
            ok:true
        }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async updateConsult(no: number,updateConsultInput: UpdateConsultInput): Promise<{ ok: boolean; error?: string}> {
    try{
      const Consult = await this.consults.findOne({no}); // consultNo 값을 통해 Consult를 불러온다. 
      console.log(Consult);

      if(updateConsultInput.Guaranteed){
        Consult.Guaranteed = updateConsultInput.Guaranteed;
      } 
      if(updateConsultInput.acquisitionPath) {
        Consult.acquisitionPath = updateConsultInput.acquisitionPath;
      }
      if(updateConsultInput.address) {
        Consult.address = updateConsultInput.address;
      }
      if(updateConsultInput.apartResidential){
        Consult.apartResidential = updateConsultInput.apartResidential;
      }
      if(updateConsultInput.daugtherStatus){
        Consult.daugtherStatus = updateConsultInput.daugtherStatus;
      }
      if(updateConsultInput.efficiencyApartmentResidential){
        Consult.efficiencyApartmentResidential = updateConsultInput.efficiencyApartmentResidential;
      }
      if(updateConsultInput.employment){
        Consult.employment = updateConsultInput.employment;
      }
      if(updateConsultInput.fatherStatus){
        Consult.fatherStatus = updateConsultInput.fatherStatus;
      }
      if(updateConsultInput.furnitureType){
        Consult.furnitureType = updateConsultInput.furnitureType;
      }
      if(updateConsultInput.history){
        Consult.history = updateConsultInput.history;
      }
      if(updateConsultInput.marriedStatus) {
        Consult.marriedStatus = updateConsultInput.marriedStatus;
      }
      if(updateConsultInput.monthlyIncome){
        Consult.monthlyIncome = updateConsultInput.monthlyIncome;
      }
      if(updateConsultInput.motherStatus){
        Consult.motherStatus = updateConsultInput.motherStatus;
      }
      if(updateConsultInput.oneRoomResidential){
        Consult.oneRoomResidential = updateConsultInput.oneRoomResidential;
      }
      if(updateConsultInput.problem){
        Consult.problem = updateConsultInput.problem;
      }
      if(updateConsultInput.sibilingsStatus){
        Consult.sibilingsStatus = updateConsultInput.sibilingsStatus;
      }
      if(updateConsultInput.sistersStatus){
        Consult.sistersStatus = updateConsultInput.sistersStatus;
      }
      if(updateConsultInput.sonStatus){
        Consult.sonStatus = updateConsultInput.sonStatus;
      }
      if(updateConsultInput.title){
        Consult.title = updateConsultInput.title;
      }
      if(updateConsultInput.villaResidential){
        Consult.villaResidential = updateConsultInput.villaResidential;
      }
      this.consults.save(Consult);
      return {
        ok: true
      }
    } catch(error){
      return {
        ok: false,
        error,
      }
    }

  }
}
