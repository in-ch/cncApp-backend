import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { User } from './users/entities/user.entity';
import { Auth } from './users/entities/auth.entity';
import { UsersModule } from './users/users.module';
import { ConsultsModule } from './consults/consults.module';
import { RoomsModule } from './rooms/rooms.module';
import { AdminModule } from './admin/admin.module';
import { Consult } from './consults/entities/consult.entity';
import { Rooms } from './rooms/entities/rooms.entity';
import { UploadsModule } from './uploads/uploads.module';
import { Admin } from './admin/entities/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === '.prod.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'prod')
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User,Auth, Consult, Rooms, Admin], // db 들어가는 곳 
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,  // subscription을 사용하기 위해서는 true로 바꿔야 함 default는 false
      context: ({ req, connection }) => {  // subscription에서 http headers를 이용한 기능을 수행하기 위해.
        if(req) {
          return {user: req['user']};
        } else {
          return {user: connection['user']};
        }
      }
      // ({user: req['user']}),  // 모든 resolver에 공유하도록 할 수 있음
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    UsersModule,
    AppModule,
    ConsultsModule,
    RoomsModule,
    AdminModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware)
    .forRoutes({path: "/graphQL", method:  RequestMethod.ALL})
  }
}
