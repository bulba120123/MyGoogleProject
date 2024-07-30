import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAccountManagementDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account-management.entity';
import * as dayjs from 'dayjs';
import { CreateAccountDto } from './dto/create-account.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountManagementService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly configService: ConfigService,
  ) {}
  
  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(id: number): Promise<Account> {
    return this.accountRepository.findOneBy({ id });
  }

  async create(account: Account): Promise<Account> {    
    const savedAccount = await this.accountRepository.save(account);

    const userIdPrefix = this.configService.get<string>('USER_ID_PREFIX');

    const id = savedAccount.id
    const createId = (2000 + id).toString().padStart(5, '0');
    const userId = `mockeleven${createId}`

    savedAccount.userId = userId
    savedAccount.email = `${userId}@gmail.com`
    
    if (!savedAccount.password) {
      const generatedPassword = this.generatePassword(savedAccount.id);
      savedAccount.password = generatedPassword;
      await this.accountRepository.save(savedAccount);
    }

    return savedAccount;
  }


  async update(id: number, account: Account): Promise<Account> {
    await this.accountRepository.update(id, account);
    return this.accountRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async reserve(id: number): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    account.isReserved = true;
    account.reservedAt = new Date();
    return this.accountRepository.save(account);
  }

  private generatePassword(id: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const passwordLength = 8;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    // id 값을 문자열로 변환하여 일부 포함
    password += id.toString().slice(0, 2);

    return password;
  }
}
