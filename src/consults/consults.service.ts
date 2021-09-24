import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { pushAdmin } from 'src/fcm/config';
import { User } from 'src/users/entities/user.entity';
import { Entity, Repository } from 'typeorm';
import { RequestConsultInput } from './dto/request-consult.dto';
import { UpdateConsultInput } from './dto/update-consult.dto';
import { Consult } from './entities/consult.entity';

@Injectable()
export class ConsultService {
  constructor(
    @InjectRepository(Consult) private readonly consults: Repository<Consult>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Admin) private readonly admins: Repository<Admin>,
  ) {}

  async requestConsult(requestConsultInput: RequestConsultInput, userNo: number): Promise<Consult> {
    try {
        const newConsult = this.consults.create(
          requestConsultInput,
        );
        const Writer = await this.users.findOne({
          where:{
            no:userNo,
          }
        });
        newConsult.user = Writer;
        
        await this.consults.save(newConsult);
        return newConsult;
    } catch (error) {
      return null;
    }
  }

  async updateConsult(no: number,updateConsultInput: UpdateConsultInput): Promise<{ ok: boolean; error?: string}> {
    try{
      const Consult = await this.consults.findOne({no}); // consultNo 값을 통해 Consult를 불러온다. 

      // if(updateConsultInput.Guaranteed){
      //   Consult.Guaranteed = updateConsultInput.Guaranteed;
      // } 
      if(updateConsultInput.acquisitionPath) {
        Consult.acquisitionPath = updateConsultInput.acquisitionPath;
      }
      if(updateConsultInput.address) {
        Consult.address = updateConsultInput.address;
      }
      // if(updateConsultInput.apartResidential){
      //   Consult.apartResidential = updateConsultInput.apartResidential;
      // }
      if(updateConsultInput.daugtherStatus){
        Consult.daugtherStatus = updateConsultInput.daugtherStatus;
      }
      // if(updateConsultInput.efficiencyApartmentResidential){
      //   Consult.efficiencyApartmentResidential = updateConsultInput.efficiencyApartmentResidential;
      // }
      // if(updateConsultInput.employment){
      //   Consult.employment = updateConsultInput.employment;
      // }
      if(updateConsultInput.fatherStatus){
        Consult.fatherStatus = updateConsultInput.fatherStatus;
      }
      if(updateConsultInput.method){
        Consult.method = updateConsultInput.method;
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
      if(updateConsultInput.motherStatus){
        Consult.motherStatus = updateConsultInput.motherStatus;
      }
      // if(updateConsultInput.oneRoomResidential){
      //   Consult.oneRoomResidential = updateConsultInput.oneRoomResidential;
      // }
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
      // if(updateConsultInput.villaResidential){
      //   Consult.villaResidential = updateConsultInput.villaResidential;
      // }
      
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

  async paidDone(no: number, status: number): Promise<{ok:boolean,error?:string}> {
    try{
      const Consult = await this.consults.findOne({no});
      Consult.status = status; 
      this.consults.save(Consult);

      if(status === 1){
        const admin = await this.admins.findOne({});
        this.sendPushAdmin(admin.DeviceToken);
      }
      

      return {
        ok:true,
      }
    } catch(error){
      return {
        ok:false,
        error
      }
    }
  }

  async loadConsultData(consultNo: number): Promise<Consult> {
    try{
      const consult = await this.consults.findOne({
        where: {
            no:consultNo 
        },
        order: {
          no: "DESC"
        }
      });
      return consult;
    } catch (error){
      throw error;
    }
  }
  
  async loadConsultList(userNo: number): Promise<Consult[]> {
    try{
      const consults = await this.consults.find({
        where: {
          user:{
            no:userNo
          }
        },
        order: {
          status:"ASC",
          no:"DESC"
        }
      });
      return consults;
    } catch (error){
      throw error;
    }
  }
  async loadConsultListAll(): Promise<Consult[]> {
    try{
      const consults = await this.consults.find({
        order: {
          status:"ASC",
          no:"DESC"
        }, 
        relations:["user"]
      });
      return consults;
    } catch (error){
      throw error;
    }
  }

  async seeUser(consultNo: number) : Promise<{ok:boolean,error?:string}> {
    try{

      const Consult = await this.consults.findOne({
          no:consultNo
      }); // consultNo 값을 통해 Consult를 불러온다. 

      Consult.userSee = true;
      await this.consults.save(Consult);

      return {
        ok:true,
      }
    } catch(error){
      return {
        ok:false,
        error
      }
    }
  }

  async seeAdmin(consultNo: number) : Promise<{ok:boolean,error?:string}> {
    try{
      const Consult = await this.consults.findOne({
          no:consultNo
      }); // consultNo 값을 통해 Consult를 불러온다. 

      Consult.adminSee = true;
      await this.consults.save(Consult);

      return {
        ok:true,
      }
    } catch(error){
      return {
        ok:false,
        error
      }
    }
  }
  async seeWhenSendMessage(consultNo: number, whatToggle: boolean) : Promise<{ok:boolean,error?:string}> {
    try{

      const Consult = await this.consults.findOne({
          no:consultNo
      }); // consultNo 값을 통해 Consult를 불러온다. 

      if(whatToggle){  // true가 user가 메시지를 보냈을 때 
        Consult.adminSee = false;
        Consult.userSee = true;
      } else {  // false가 admin이 메시지를 보냈을 때 
        Consult.adminSee = true;
        Consult.userSee = false;
      }
      
      await this.consults.save(Consult);

      return {
        ok:true,
      }
    } catch(error){
      return {
        ok:false,
        error
      }
    }
  }
  sendPushAdmin = (fcmToken: string): boolean => {
    const message = {
      notification: {
        title: '',
        body: '새로운 상담 의뢰가 왔습니다.',
      },
      token: fcmToken,
    };
    pushAdmin
      .messaging()
      .send(message) // secondary => dev   push => prod
      .catch((error) => {
        console.log('🚨 error', JSON.stringify(error));
      });
    return true;
  };
}
