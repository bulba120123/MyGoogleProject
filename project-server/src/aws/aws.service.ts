import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  _InstanceType,
  DescribeImagesCommand,
  EC2Client,
  RunInstancesCommand,
} from '@aws-sdk/client-ec2';
import { AwsAccount } from './aws-account/entities/aws-account.entity';
import { CreateEc2Dto } from './dto/create-ec2.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class AwsService {
  async createEc2Instance(createEc2Dto: CreateEc2Dto) {
    try {
      const client = new EC2Client({
        region: 'ap-northeast-2',
        credentials: {
          accessKeyId: createEc2Dto.accountId,
          secretAccessKey: createEc2Dto.accountPassword,
        },
      });

      const findEc2InstanceParams = {
        Owners: ['amazon'],
        Filters: [
          { Name: 'name', Values: ['al2023-ami-2023*'] },
          { Name: 'state', Values: ['available'] },
          { Name: 'is-public', Values: ['true'] },
          { Name: 'root-device-type', Values: ['ebs'] },
          { Name: 'architecture', Values: ['x86_64'] },
          { Name: 'virtualization-type', Values: ['hvm'] },
        ],
      };

      const findEc2InstanceCommand = new DescribeImagesCommand(
        findEc2InstanceParams,
      );
      const findEc2Instanceresponse = await client.send(findEc2InstanceCommand);
      // Sort images by CreationDate and get the latest one
      const sortedImages = findEc2Instanceresponse.Images.sort((a, b) =>
        dayjs(a.CreationDate).isBefore(dayjs(b.CreationDate)) ? -1 : 1,
      );
      const latestImage = sortedImages[sortedImages.length - 1];
      console.log(latestImage);

      const createEc2InstanceParams = {
        InstanceType: _InstanceType.t2_micro,
        ImageId: latestImage.ImageId,
        MinCount: 1,
        MaxCount: 1,
        BlockDeviceMappings: [
          {
            DeviceName: '/dev/xvda', // 기본 루트 장치 이름
            Ebs: {
              VolumeSize: 30, // 볼륨 크기를 30GB로 설정
            },
          },
        ],
      };

      const createEc2InstanceCommand = new RunInstancesCommand(
        createEc2InstanceParams,
      );
      const createEc2InstanceResponse = await client.send(
        createEc2InstanceCommand,
      );
      const createdInstanceId =
        createEc2InstanceResponse.Instances[0].InstanceId;
      return createdInstanceId;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create EC2 instance',
        error.message,
      );
    }
  }
}
