import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';
import { Role } from 'src/auth/role.decorator';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(returns => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountInput,
      );
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation(_ => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, error, token } = await this.usersService.login(loginInput);
      return { ok, error, token };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(_ => User)
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Role(['Any'])
  @Mutation(_ => EditProfileOutput) 
  async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
    try{
      await this.usersService.editProfile(authUser.id, editProfileInput);
      return {
        ok:true,
      }
    } catch(error){
      return {
        ok:false,
        error
      }
    }
  }
}
