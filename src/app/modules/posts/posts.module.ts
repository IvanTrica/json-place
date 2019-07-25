import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostsComponent } from './pages/posts/posts.component';
import { PostFormComponent } from './pages/add-post/post-form.component';
import { HttpClientModule } from '@angular/common/http';
 

const MODULES = [
  HttpClientModule,
  CommonModule,
  PostsRoutingModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule
];
const COMPONENTS = [
  PostsComponent,
  PostFormComponent
];

@NgModule({
  declarations: [ ...COMPONENTS ],
  imports: [
    ...MODULES
  ]
})
export class PostsModule { }
