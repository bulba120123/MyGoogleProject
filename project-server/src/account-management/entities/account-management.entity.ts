import { CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";

export class Account {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId: string;
  
    @Column()
    email: string;

    @Column({ nullable: true })
    password?: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @Column({ default: false })
    isReserved?: boolean;
  
    @Column({ type: 'timestamp', nullable: true })
    reservedAt?: Date;

    @Column()
    description?: string;
}
