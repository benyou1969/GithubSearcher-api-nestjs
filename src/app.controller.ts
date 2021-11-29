import {
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { TypeSearch } from './types';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager,
    private readonly appService: AppService,
  ) {}

  @Get('/api/search')
  @UseInterceptors(CacheInterceptor)
  async searchForUserOrRepository(
    @Query('t') t: TypeSearch = TypeSearch.USERS,
    @Query('q') q: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    return await this.appService.searchForUserOrRepository(t, q);
  }

  @Get('/api/clear-cache')
  async clearCache() {
    await this.cacheManager.reset();
  }
}
