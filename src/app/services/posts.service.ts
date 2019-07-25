import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { apiCall } from 'src/environments/environment';
import { User } from '../classes/user';
import { Post } from '../classes/post';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  postList$ = this.postListSubject.asObservable();

  private postSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  post$ = this.postSubject.asObservable();

  private postListAll: Post[] = [];

  constructor(private api: ApiService) { }

  /**
   * Get all Posts from API
   */
  getPosts(): void {
    const data = this.getData('postListAll');
    this.postListAll = JSON.parse(data);

    if (this.postListAll !== null && this.postListAll.length > 0) {
      this.postListSubject.next(this.postListAll);
    } else {
      this.api.getData(apiCall.getPosts)
        .pipe(
          map((res: any): any[] => {
            if (res.length > 0) {
              const posts = res.map(item => {
                return new Post({
                  id: item.id,
                  title: item.title,
                  userId: item.userId,
                  body: item.body
                });
              });
              return posts;
            } else {
              return [];
            }
          })
        )
        .subscribe((posts: any[]) => {
          this.setData('postListAll', posts);
          this.postListSubject.next(posts);
        });
    }
  }

  /**
   * @description Delete post
   */
  deletePost(id: number) {
    const data = this.getData('postListAll');
    this.postListAll = JSON.parse(data);
    this.api.deleteData(apiCall.deletePosts + id).subscribe(response => {
      const findPostIndex = this.postListAll.findIndex(post => id === +post.id);
      if (findPostIndex > -1) {
        this.postListAll.splice(findPostIndex, 1);
        this.setData('postListAll', this.postListAll);
        this.postListSubject.next(this.postListAll);
      }
    });
  }

  /**
   * Get list of users
   */
  getUsers(): Observable<User[]> | User[] {
    return this.api.getData(apiCall.getUsers)
      .pipe(
        map((data: any): any[] => {
          if (data.length > 0) {
            const users = data.map(item => {
              return new User({
                id: item.id,
                name: item.name,
                username: item.username,
                email: item.email,
                phone: item.phone,
                website: item.website
              });
            });
            return users;
          } else {
            return [];
          }
        })
      );
  }

  /**
   * @description Get one post data from API
   */
  getPost(id: number) {
    const data = this.getData('postListAll');
    let findPost;
    this.postListAll = JSON.parse(data);

    if (this.postListAll !== null && this.postListAll.length > 0) {
      findPost = this.postListAll.find(post => +id === post.id);
    }

    if (findPost) {
      this.postSubject.next(findPost);
    } else {
      this.api.getData(apiCall.getPost + id)
        .pipe(
          map((res: any): any => {
            if (res) {
              const post = new Post({
                id: res.id,
                title: res.title,
                userId: res.userId,
                body: res.body
              });
              return post;
            } else {
              return null;
            }
          })
        )
        .subscribe((post: Post) => {
          if (post) {
            this.postSubject.next(post);
          }
        });
    }
  }

  /**
   * @description Fake Post Update function
   */
  updatePost(post: Post): void {
    const data = this.getData('postListAll');
    this.postListAll = JSON.parse(data);
    const f = this.postListAll.findIndex(item => item.id === post.id);
    if (f > -1) {
      this.postListAll[f] = post;
    }
    this.setData('postListAll', this.postListAll);
    this.postListSubject.next(this.postListAll);
  }

  /**
   * @description Fake Post Inser function
   */
  insertPost(post: Post): void {
    const data = this.getData('postListAll');
    this.postListAll = JSON.parse(data);
    this.postListAll.push(post);
    this.setData('postListAll', this.postListAll);
    this.postListSubject.next(this.postListAll);
  }

  /**
   * @description Helper function for get array of id's
   */
  getIds(arr: Post[]): number[] {
    return arr.map((item) => {
      return item.id;
    });
  }

  /**
   * @description Get highest id so we can fake new id for new Post
   */
  getHighestId(): number {
    const data = this.getData('postListAll');
    this.postListAll = JSON.parse(data);
    return Math.max(...this.getIds(this.postListAll));
  }

  /**
   * @description Helper function for storing data in localstorage
   */
  setData(key, data): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * @description Helper function for geting data from localstorage
   */
  getData(key): string {
    return localStorage.getItem(key);
  }
}
