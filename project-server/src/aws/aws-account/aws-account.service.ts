import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsAccount } from './entities/aws-account.entity';
import { UpdateAwsAccountDto } from './dto/update-aws-account.dto';
import { ActivateAwsAccountDto } from './dto/active-aws-account.dto';

@Injectable()
export class AwsAccountService {
  constructor(
    @InjectRepository(AwsAccount)
    private readonly awsAccountRepository: Repository<AwsAccount>,
  ) {}

  create(createAwsAccountDto: Partial<AwsAccount>): Promise<AwsAccount> {
    const awsAccount = this.awsAccountRepository.create(createAwsAccountDto);
    try {
      return this.awsAccountRepository.save(awsAccount);
    } catch (e) {
      if (e.code === '23505') {
        // Postgres unique violation error code
        throw new ConflictException('AccountId already exists');
      }
      throw e;
    }
  }

  findAll(): Promise<AwsAccount[]> {
    return this.awsAccountRepository.find();
  }

  findOneById(id: number): Promise<AwsAccount> {
    return this.awsAccountRepository.findOneBy({ id });
  }

  findOneByAccountId(accountId: string): Promise<AwsAccount> {
    return this.awsAccountRepository.findOneBy({ accountId });
  }

  async update(
    accountId: string,
    updateAwsAccountDto: Partial<UpdateAwsAccountDto>,
  ): Promise<AwsAccount> {
    const update: Partial<AwsAccount> = {
      ...updateAwsAccountDto,
      updateAt: new Date(),
    };
    await this.awsAccountRepository.update({ accountId }, update);
    return this.awsAccountRepository.findOneBy({ accountId });
  }

  async activate(
    accountId: string,
    activateAwsAccountDto: ActivateAwsAccountDto,
  ): Promise<AwsAccount> {
    const awsAccount = await this.awsAccountRepository.findOneBy({ accountId });
    if (!awsAccount) {
      throw new NotFoundException(
        `AwsAccount with accountId ${accountId} not found`,
      );
    }
    awsAccount.isActive = activateAwsAccountDto.isActive;
    awsAccount.activeAt = activateAwsAccountDto.isActive ? new Date() : null;
    awsAccount.updateAt = new Date();
    return this.awsAccountRepository.save(awsAccount);
  }

  async remove(accountId: string): Promise<void> {
    await this.awsAccountRepository.delete({ accountId });
  }
}
