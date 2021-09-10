import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

import axios from 'axios';


import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Auth } from './entities/auth.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { PubSub } from 'graphql-subscriptions';
import { SmsApi } from './dtos/sms-api.dto';
import { CompareCodeInput, CompareCodeOutput } from './dtos/compare-code';
import { push } from 'src/fcm/config';

const pubSub = new PubSub();
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Auth) private readonly auths: Repository<Auth>,
    private readonly jwtService: JwtService,
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
  private isRegisterd = async(phone:string): Promise<boolean> => { // 회원 가입된 번호인지 
    const exists = await this.users.findOne({ phone });
    if(exists){
      return true;
    } else {
      return false;
    }
  }

  async createAccount({
    phone,
    name,
    birth,
    history,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string; token?: string; }> {
    try {
      const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');
      const exists = await this.users.findOne({ phone : convertPhone });
      if (exists) {
        return { ok: false, error: '이미 존재하는 핸드폰 번호입니다.' };
      }
      const user = await this.users.save(
        this.users.create({ name, phone : convertPhone,birth,history }),
      );
      const token = this.jwtService.sign(user.no);

      return { 
        ok: true,
        token 
      };
    } catch (e) {
      return { ok: false, error: "회원 가입이 불가합니다." };
    }
  }

  async login({
    phone
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');
    console.log(convertPhone);
    try {
      const user = await this.users.findOne(
        { phone : convertPhone }
      );
      if (!user) {
        return {
          ok: false,
          error: '유저가 존재하지 않습니다.',
        };
      }
      const token = this.jwtService.sign(user.no);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async compareCode({
    phone,
    token
  }:CompareCodeInput):Promise<CompareCodeOutput>{
    const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');

    const exists = await this.auths.findOne(
      {
        phone:convertPhone,
        token
      }
    );
    if(exists){
      // 존재  
      this.auths.delete({
        phone:convertPhone
      });
      return {
        ok:true, 
      }
    } else {
      // 미존재 
      return {
        ok:false,
        error:"인증번호가 틀립니다."
      }
    }
  }

  async smsApi(phone:string):Promise<SmsApi>{

    const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');

    const exists = await this.users.findOne({ phone : convertPhone });
    if (exists) {
      return { ok: false, error: '이미 회원 가입한 핸드폰 번호입니다.' };
    }

    try{
      let token = ''
      for (let i = 0; i < 6; i++) {
        token += Math.floor(Math.random() * 10)
      }

      const serviceId = "ncp:sms:kr:271475285604:cnc-sms";
      const accessKey = "DAOZ2Ohub48Xse0holQC";  
      const url_ = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`; 
      
      const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01056922949', // 발신자 번호
        content: `[CNC 인증문자] ${token}`,
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

      await this.auths.save(
        this.auths.create({ token, phone : convertPhone }),
      );

      return {
        ok:true,
        token,
      }
    } catch (e) {
      
      return {
        ok:false,
        error:'문자 요청에 실패했습니다. 수신 번호을 확인해주세요.',
      }
    }
  }

  async smsApi2(phone:string):Promise<SmsApi>{

    const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');

    const exists = await this.users.findOne({ phone : convertPhone });
    if (!exists) {
      return { ok: false, error: '회원 가입한 핸드폰 번호가 아닙니다.' };
    }

    try{
      let token = ''
      for (let i = 0; i < 6; i++) {
        token += Math.floor(Math.random() * 10)
      }

      const serviceId = "ncp:sms:kr:271475285604:cnc-sms";
      const accessKey = "DAOZ2Ohub48Xse0holQC";  
      const url_ = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`; 
      
      const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01056922949', // 발신자 번호
        content: `[CNC 인증문자] ${token}`,
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

      await this.auths.save(
        this.auths.create({ token, phone : convertPhone }),
      );
      return {
        ok:true,
        token,
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
        title: 'title',
        body: 'body',
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
}
