import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { SmsApi } from './dtos/sms-api.dto';
import { CompareCodeInput, CompareCodeOutput } from './dtos/compare-code';

const pubSub = new PubSub();
@Resolver(_ => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  
  @Query(_ => String)

  @Mutation(_ => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return await this.usersService.login(loginInput);
  }

  @Mutation(_ => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const result =  await this.usersService.createAccount(createAccountInput);
    pubSub.publish('userAdded',{ userAdded: result });
    return result;
  }
  
  @Mutation(_ => SmsApi)
  async smsApi(
    @Args('phone',{type: () => String}) phone: string,
  ): Promise<SmsApi> {
    return await this.usersService.smsApi(phone);
  }

  @Mutation(_ => CompareCodeOutput)
  async compareCode(
    @Args('input') compareCodeInput: CompareCodeInput,
  ):Promise<CompareCodeOutput> {
    return await this.usersService.compareCode(compareCodeInput);
  }


  @Subscription(()=>CreateAccountOutput)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
  
  
