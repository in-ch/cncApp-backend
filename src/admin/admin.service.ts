import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginOutput } from 'src/users/dtos/login.dto';
import { Repository } from 'typeorm';
import { InsertAdminTokenOutput } from './dto/insert-admin-token.dto';
import { SetStatusOutput } from './dto/set-status.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly admins: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async adminLogin(id: string, password: string): Promise<LoginOutput> {
    try{
      const admin = await this.admins.findOne({
        where: {
          id,
          password 
        }
      });
      
      const token = this.jwtService.sign(admin.no);
      console.log(token);

      return { 
        ok: true,
        token 
      };


      
    } catch (error){
      return { ok: false, error: "로그인에 실패했습니다." };
    }
  }  

  async setStatus(status: number): Promise<SetStatusOutput> {
    try{
      const admin = await this.admins.findOne({});
      admin.status = status;
      this.admins.save(admin);
      return {
        ok:true,
      }
    } catch(error) {
      return {
        ok:false,
        error:error
      }
    }
  }

  async loadAdmin(): Promise<Admin> {
    try{
      const admin = await this.admins.findOne({});
      return admin;
    } catch(error) {
      return null;
    }
  } 

  async insertAdminToken(token:string): Promise<InsertAdminTokenOutput> {
    try{
      const admin = await this.admins.findOne({});
      admin.DeviceToken = token;
      this.admins.save(admin);
      return {
        ok:true
      }
    } catch(e){
      return {
        ok: false,
        error: '정보 저장 실패',
      }
    }
  }
}
