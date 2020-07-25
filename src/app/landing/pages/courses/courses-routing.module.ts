import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { CategoryComponent } from './category/category.component';
import { CourseinfoComponent } from './courseinfo/courseinfo.component';


const routes: Routes = [
  {path: 'category', component: CategoryComponent},
  {path: 'course', component: CourseinfoComponent, children: [
    {path: 'about', loadChildren: () => import('./child/about/about.module').then(m => m.AboutModule)},
    {path: 'resources', loadChildren: () => import('./child/resources/resources.module').then(m => m.ResourcesModule)},
    {path: 'reviews', loadChildren: () => import('./child/reviews/reviews.module').then(m => m.ReviewsModule)},
    {path: 'discussions', loadChildren: () => import('./child/discussions/discussions.module').then(m => m.DiscussionsModule)},
    {path: '', loadChildren: () => import('./child/default/default.module').then(m => m.DefaultModule)}
  ]},
  {path: '', component: StartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
