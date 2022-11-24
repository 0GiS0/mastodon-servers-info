import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Release } from './release';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getReleases(): Observable<Release[]> {

    return this.http.get<Release[]>('https://api.github.com/repos/mastodon/mastodon/releases')
      .pipe(
        tap(_ => {
        
          console.log('fetched mastodon releases')
        }
        ));
  }
}
