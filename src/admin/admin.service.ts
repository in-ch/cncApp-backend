import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginOutput } from 'src/users/dtos/login.dto';
import { Entity, Repository } from 'typeorm';
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
      return { 
        ok: true,
        token 
      };
    } catch (error){
      return { ok: false, error: "로그인에 실패했습니다." };
    }
  }  
}
