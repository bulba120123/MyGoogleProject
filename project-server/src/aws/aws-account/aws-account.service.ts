import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsAccount } from './entities/aws-account.entity';

@Injectable()
export class AwsAccountService {
  constructor(
    @InjectRepository(AwsAccount)
    private readonly awsAccountRepository: Repository<AwsAccount>,
  ) {}

  create(createAwsAccountDto: Partial<AwsAccount>): Promise<AwsAccount> {
    const awsAccount = this.awsAccountRepository.create(createAwsAccountDto);
    return this.awsAccountRepository.save(awsAccount);
  }

  findAll(): Promise<AwsAccount[]> {
    return this.awsAccountRepository.find();
  }

  findOne(id: number): Promise<AwsAccount> {
    return this.awsAccountRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAwsAccountDto: Partial<AwsAccount>,
  ): Promise<AwsAccount> {
    await this.awsAccountRepository.update(id, updateAwsAccountDto);
    return this.awsAccountRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.awsAccountRepository.delete(id);
  }
}
