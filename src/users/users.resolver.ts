import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';

const pubSub = new PubSub();
@Resolver(_ => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  
  @Query(_ => String)

  @Mutation(_ => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    const loginResult = await this.usersService.login(loginInput);
    return loginResult;
  }

  @Mutation(_ => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const result =  await this.usersService.createAccount(createAccountInput);
    pubSub.publish('userAdded',{ userAdded: result });
    return result;
  }
  
  @Subscription(()=>CreateAccountOutput)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
  
  
