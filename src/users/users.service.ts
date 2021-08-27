import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Auth } from './entities/auth.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Auth) private readonly auths: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    phone,
    name,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const convertPhone = phone.trim().replace(/-/g,'').replace(/ /g,'');
      console.log(convertPhone);
      const exists = await this.users.findOne({ phone : convertPhone });
      if (exists) {
        return { ok: false, error: '이미 존재하는 핸드폰 번호입니다.' };
      }
      const user = await this.users.save(
        this.users.create({ name, phone : convertPhone }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "회원 가입이 불가합니다." };
    }
  }

  async login({
    name,
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
      const token = this.jwtService.sign(user.phone);
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

  // async findById(id:number):Promise<User>{
  //   return this.users.findOne({id});
  // }

  // async editProfile(userId:number, { email, password }: EditProfileInput) : Promise<User> {
  //   const user = await this.users.findOne(userId);
  //   if (email) {
  //     user.email = email;
  //   }
  //   if (password) {
  //     user.password = password;
  //   }
  //   return this.users.save(user); 
  // }

}
