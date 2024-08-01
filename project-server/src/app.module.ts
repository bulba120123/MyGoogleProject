import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountManagementModule } from './account-management/account-management.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';
import { DatabaseModule } from './database/database.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SignupModule,
    DatabaseModule,
    AccountManagementModule,
    AwsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
