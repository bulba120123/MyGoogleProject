import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('aws_account')
@Unique(['accountId'])
export class AwsAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: string;

  @Column()
  accountPassword: string;

  @Column({ nullable: true })
  accountName: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  activeAt: Date;

  @Column({ default: false })
  isActive: boolean;
}
