import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Admin } from './entities/admin.entity';
import { AdminService } from './admin.service';
import { LoginOutput } from 'src/users/dtos/login.dto';
import { SetStatusInput, SetStatusOutput } from './dto/set-status.dto';

@Resolver(_ => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

    @Query(_ => Admin) 
    async loadAdmin(

    ): Promise<Admin>{
        return await this.adminService.loadAdmin();
    };

    @Mutation(_ => LoginOutput)
    async adminLogin(
        @Args('id', {type: () => String}) id: string,
        @Args('password', {type: () => String}) password: string,
    ): Promise<LoginOutput> {
        return await this.adminService.adminLogin(id, password);
    }

    @Mutation(_ => SetStatusOutput)
    async setStatus(
        @Args('status', {type: () => Number}) status: number,
    ): Promise<SetStatusOutput> {
        return await this.adminService.setStatus(status);
    }

    
}