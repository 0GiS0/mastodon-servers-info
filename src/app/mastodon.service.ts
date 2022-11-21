import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ServerInfo } from './server';

@Injectable({
  providedIn: 'root'
})
export class MastodonService {

  constructor(private http: HttpClient) { }

  getServers(): Observable<ServerInfo[]> {

    return this.http.get<ServerInfo[]>('https://api.joinmastodon.org/servers')
    .pipe(
      tap(_ => console.log('fetched servers')));     
  }
}
