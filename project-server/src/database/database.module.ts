import { Module, Global, Logger } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        };

        try {
          // 데이터베이스 연결 시도
          const connection = await TypeOrmModule.forRoot(options);
          return connection["options"];
        } catch (error) {
          console.error('Database connection failed:', error.message);
          // 연결 실패 시 빈 옵션 반환
          return {
            type: 'postgres',
            entities: [],
          };
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
