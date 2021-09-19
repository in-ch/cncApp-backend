import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './entities/rooms.entity';
import { CreateRoomInput } from './dtos/create-room.dto';
import { User } from 'src/users/entities/user.entity';
import { Consult } from 'src/consults/entities/consult.entity';
import { CreateRoomMessagePhotoInput } from './dtos/create-room-message-photo.dto';
import * as crypto from 'crypto';
import axios from 'axios';
import { SmsApi } from 'src/users/dtos/sms-api.dto';
import { push, pushAdmin } from 'src/fcm/config';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms) private readonly rooms: Repository<Rooms>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Consult) private readonly consults: Repository<Consult>,
    @InjectRepository(Admin) private readonly admins: Repository<Admin>,
    
  ) {}

  private makeSignature(): string {

    const NCP_accessKey = "DAOZ2Ohub48Xse0holQC";          // access key id (from portal or sub account)
    const NCP_secretKey = "WEWejYYF9m8ePfgishVJIqSVAKGAURG12GOeUeER";  // secret key (from portal or sub account)
    const NCP_serviceID = "ncp:sms:kr:271475285604:cnc-sms";

    const space = " ";          // one space
    const newLine = "\n";           // new line
    const method = "POST";          // method
    const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;
    const timestamp = Date.now().toString();
    
    let message = [];
    let hmac=crypto.createHmac('sha256',NCP_secretKey);

    message.push(method);
    message.push(space);
    message.push(url2);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(NCP_accessKey);
    const signature = hmac.update(message.join('')).digest('base64');
    return signature.toString();
  } 

  async loadRooms(consultNo:number): Promise<Rooms[]> {
    try {
      const rooms = await this.rooms.find({
          where: {
            consult: {
              no:consultNo
            }
          },
          order: {
            no:"DESC"
          },
      });

      
      return rooms;
    } catch (error) {
      throw error;
    }
  }

  async createRooms(createRoomInput: CreateRoomInput): Promise<Rooms> {
      try {
        const { toUserId, message, isAdmin, consultId } = createRoomInput;
        const to = await this.users.findOne(toUserId);
        const user = await this.users.findOne(toUserId);
        const consult = await this.consults.findOne(consultId);
        const newRooms = this.rooms.create({
          user,
          to,
          message,
          isAdmin,
          consult,
          userName:user.name,
          birth:user.birth,
          phone:user.phone,
        });
        const admin = await this.admins.findOne({});
        if(isAdmin){
          this.sendPush(user.DeviceToken);
        } else {
          this.sendPushAdmin(admin.DeviceToken);
        }
        

        return this.rooms.save(newRooms); 
    } catch (error) {
      throw error;
    }
  }

  async createRoomMessagePhoto(createRoomMessagePhotoInput: CreateRoomMessagePhotoInput): Promise<Rooms> {
    try{
      const { toUserId, file, isAdmin, consultId } = createRoomMessagePhotoInput;
      const to = await this.users.findOne(toUserId);
      const user = await this.users.findOne(toUserId);
      const consult = await this.consults.findOne(consultId);;

      const newRooms = this.rooms.create({
        user,
        to,
        file,
        isAdmin,
        consult,
        userName:user.name,
        birth:user.birth,
        phone:user.phone,
      });
      return this.rooms.save(newRooms); 
    } catch (error) {
      throw error;
    }
  }
  async sendMessage(phone:string, text:string):Promise<SmsApi>{

    const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');

    try{
      const serviceId = "ncp:sms:kr:271475285604:cnc-sms";
      const accessKey = "DAOZ2Ohub48Xse0holQC";  
      const url_ = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`; 
      
      const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01056922949', // 발신자 번호
        content: `[CNC] ${text}`,
        messages: [
          {
            to: convertPhone, // 수신자 번호
          },
        ],
      };
      const options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-timestamp': Date.now().toString(),
          'x-ncp-apigw-signature-v2': this.makeSignature(),
        },
      };

      axios
        .post(url_, body, options)
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          throw new InternalServerErrorException();
        });

      return {
        ok:true,
      }
    } catch (e) {
      return {
        ok:false,
        error:'문자 요청에 실패했습니다. 수신 번호을 확인해주세요.',
      }
    }
  }
  sendPush = (fcmToken: string): boolean => {
    const message = {
      notification: {
        title: '새로운 메시지가 왔습니다.',
        body: '상담사님께 새로운 메시지가 왔습니다.',
      },
      token: fcmToken,
    };
    push
      .messaging()
      .send(message) // secondary => dev   push => prod
      .catch((error) => {
        console.log('🚨 error', JSON.stringify(error));
      });
    return true;
  };

  sendPushAdmin = (fcmToken: string): boolean => {
    const message = {
      notification: {
        title: '',
        body: '새로운 메시지가 도착했습니다.',
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
