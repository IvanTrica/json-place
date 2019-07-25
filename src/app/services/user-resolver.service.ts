import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

  constructor( private postsService: PostsService, private http: HttpClient) { }

  resolve(): Observable<User[]> | Promise<User[]> | User[] {
    return this.postsService.getUsers();
  }
}
