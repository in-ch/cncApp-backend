import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';

const pubSub = new PubSub();
@Resolver(of => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  
  @Query(_ => String)
  Hello():void {
    console.log("Hello");
  } 

  @Mutation(_ => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    const loginResult = await this.usersService.login(loginInput);

    pubSub.publish('userAdded',{ userAdded: loginResult });

    return loginResult;
  }

  @Subscription(()=>LoginOutput)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
  
}
  
  
