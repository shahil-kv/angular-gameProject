import { NgModule } from '@angular/core';
// we must have to use this routing  inorder to have the routing capacity in
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './video/manage/manage.component';
import { ClipComponent } from './clip/clip.component';
// this is for the routing in the array
const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'about' },
  { path: 'clip/:id', component: ClipComponent, title: 'clip' }
  // we are giving any values as our need in that id and then the id is like that and the id is stored in the router module we can access the routing parameter like the id
  // how we can retrieve data from the url using the router
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
