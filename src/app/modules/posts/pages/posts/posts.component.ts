import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, ReplaySubject } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { Post } from 'src/app/classes/post';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {


  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  private users: User[];
  private posts: Post[];
  public searchTerm = '';
  private originalPosts: Post[];
  public postsArray: Post[];

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router) { }


  ngOnInit() {

    this.titleService.setTitle(`Posts`);
    this.users = this.route.snapshot.data.users;
    this.postService.getPosts();

    this.postService.postList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.posts = data.map(post => {
          const f = this.users.find(user => user.id === post.userId);
          if (f) {
            post.userName = f.username;
          }
          return post;
        });
        this.originalPosts = this.posts;
        this.postsArray = this.posts.slice(0, 20);
      });
  }

  goToNewPost(): void {
    this.router.navigate(['post-form']);
  }

  deletePost(id: number): void {
    this.postService.deletePost(id);
  }

  editPost(id: number): void {
    this.router.navigate(['post-form/' + id]);
  }

  inputSearch(value: string): void {
    this.searchTerm = value;
  }

  /**
   * @description Function for infinite scroll
   */
  onScroll(): void {
    if (this.postsArray.length < this.originalPosts.length) {
      const len = this.postsArray.length;
      for (let i = len; i <= len + 20; i++) {
        if (this.originalPosts[i]) {
          this.postsArray.push(this.originalPosts[i]);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
