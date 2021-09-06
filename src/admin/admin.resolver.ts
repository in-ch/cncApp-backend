import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Admin } from './entities/admin.entity';
import { AdminService } from './admin.service';
import { LoginOutput } from 'src/users/dtos/login.dto';

@Resolver(_ => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

    @Mutation(_ => LoginOutput)
    async adminLogin(
        @Args('id', {type: () => String}) id: string,
        @Args('password', {type: () => String}) password: string,
    ): Promise<LoginOutput> {
        return await this.adminService.adminLogin(id, password);
    }
}