import { Module } from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { AccountManagementController } from './account-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account-management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountManagementController],
  providers: [AccountManagementService],
})
export class AccountManagementModule {}
