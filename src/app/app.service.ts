import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { TypeSearch } from '../types';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async searchForUserOrRepository(
    t: TypeSearch,
    q: string,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const searchType =
      t === TypeSearch.ISSUES
        ? TypeSearch.ISSUES
        : t === TypeSearch.USERS
        ? TypeSearch.USERS
        : t === TypeSearch.REPOSITORIES
        ? TypeSearch.REPOSITORIES
        : TypeSearch.USERS;

    const { data } = await this.httpService
      .get(`https://api.github.com/search/${searchType}?q=${q}`)
      .toPromise();

    return data;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
