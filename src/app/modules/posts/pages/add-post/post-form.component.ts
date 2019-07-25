import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/classes/post';
import { identifierModuleUrl } from '@angular/compiler';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {


  private subscribe: Subscription;

  users: User[] = [];
  postId: number;
  actionTxt: string;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private titleService: Title,
    private router: Router) { }

  get title(): FormControl {
    return this.registerForm.get('title') as FormControl;
  }

  get body(): FormControl {
    return this.registerForm.get('body') as FormControl;
  }

  get user(): FormControl {
    return this.registerForm.get('user') as FormControl;
  }

  ngOnInit(): void {

    this.users = this.route.snapshot.data.users;
    const { id } = this.route.snapshot.params;
    this.postId = +id;

    if (id) {
      this.titleService.setTitle(`Update Post -  ${id}`);
      this.postsService.getPost(id);

      this.subscribe = this.postsService.post$.subscribe(post => {
        this.registerForm = this.fb.group({
          title: new FormControl(post.title, [Validators.required]),
          body: new FormControl(post.body, Validators.required),
          user: new FormControl(post.userId, Validators.required)
        });
      });
      this.actionTxt = 'Update';
    } else {
      this.titleService.setTitle(`Add New Post`);
      this.registerForm = this.fb.group({
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', Validators.required),
        user: new FormControl('', Validators.required)
      });
      this.actionTxt = 'Save';
    }
  }

  backToPosts(): void {
    this.router.navigate(['']);
  }


  /**
   * @description Submit form
   */
  onSubmit(): void {
    const { body, title, user } = this.registerForm.value;
    const id = this.postId ? this.postId : this.postsService.getHighestId() + 1;
    const postData = new Post({
      id,
      title,
      userId: +user,
      body
    })
    if (this.registerForm.valid) {
      if (this.postId) {
        this.postsService.updatePost(postData);
      } else {
        this.postsService.insertPost(postData);
      }
      this.router.navigate(['']);
    } else {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
