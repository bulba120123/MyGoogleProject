import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aws_account')
export class AwsAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: string;

  @Column()
  accountPassword: string;

  @Column()
  accountName: string;

  @Column()
  accountEmail: string;
}
