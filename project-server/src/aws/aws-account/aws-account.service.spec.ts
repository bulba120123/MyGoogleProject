import { Test, TestingModule } from '@nestjs/testing';
import { AwsAccountService } from './aws-account.service';

describe('AwsAccountService', () => {
  let service: AwsAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsAccountService],
    }).compile();

    service = module.get<AwsAccountService>(AwsAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
