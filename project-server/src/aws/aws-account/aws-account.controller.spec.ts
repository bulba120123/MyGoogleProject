import { Test, TestingModule } from '@nestjs/testing';
import { AwsAccountController } from './aws-account.controller';
import { AwsAccountService } from './aws-account.service';

describe('AwsAccountController', () => {
  let controller: AwsAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsAccountController],
      providers: [AwsAccountService],
    }).compile();

    controller = module.get<AwsAccountController>(AwsAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
