import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { Auth } from './entities/auth.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Auth) private readonly auths: Repository<Auth>,
    // private readonly config: ConfigService,   jwt에서 불러옴으로써 필요없어짐..
    private readonly jwtService: JwtService,

  ) {}

  // async createAccount({
  //   email,
  //   password,
  //   role,
  // }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
  //   try {
  //     const exists = await this.users.findOne({ email });
  //     if (exists) {
  //       return { ok: false, error: 'There is a user with that email already' };
  //     }
  //     const user = await this.users.save(
  //       this.users.create({ email, password, role }),
  //     );

  //     return { ok: true };
  //   } catch (e) {
  //     return { ok: false, error: "Couldn't create account" };
  //   }
  // }

  // async login({
  //   email,
  //   password,
  // }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
  //   // make a JWT and give it to the user
  //   try {
  //     const user = await this.users.findOne(
  //       { email },
  //       { select: ['id','password'] },
  //     );
  //     if (!user) {
  //       return {
  //         ok: false,
  //         error: 'User not found',
  //       };
  //     }
  //     const passwordCorrect = await user.checkPassword(password);
  //     if (!passwordCorrect) {
  //       return {
  //         ok: false,
  //         error: 'Wrong password',
  //       };
  //     }
  //     // const token = jwt.sign({ id: user.id }, this.config.get('SECRET_KEY'));
  //     const token = this.jwtService.sign(user.id);
  //     return {
  //       ok: true,
  //       token,
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error,
  //     };
  //   }
  // }

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
