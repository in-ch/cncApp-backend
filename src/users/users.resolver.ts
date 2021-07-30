import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(_ => String)
  Hello():void {
    console.log("Hello");
  } 

  @Mutation(_ => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
      return await this.usersService.createAccount(createAccountInput);
  }

  // @Mutation(_ => LoginOutput)
  // async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
  //   try {
  //     const { ok, error, token } = await this.usersService.login(loginInput);
  //     return { ok, error, token };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error,
  //     };
  //   }
  // }
}
