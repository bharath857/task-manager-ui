import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './features/task-view/task-view.component';
import { ViewProfileComponent } from './features/view-profile/view-profile.component';

const routes: Routes = [
    {path:'view-profile', component:ViewProfileComponent},
    {path:'task-view', component:TaskViewComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
