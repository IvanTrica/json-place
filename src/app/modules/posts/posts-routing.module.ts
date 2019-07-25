import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { UserResolverService } from 'src/app/services/user-resolver.service';
import { PostFormComponent } from './pages/add-post/post-form.component';

const routes: Routes = [
  { path: '', component: PostsComponent, resolve: { users: UserResolverService } },
  { path: 'post-form', component: PostFormComponent, resolve: { users: UserResolverService } },
  { path: 'post-form/:id', component: PostFormComponent, resolve: { users: UserResolverService } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
