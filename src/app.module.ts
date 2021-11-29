import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
      ttl: 60 * 60 * 2, // seconds
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
