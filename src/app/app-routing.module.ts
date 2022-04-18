import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './features/task-view/task-view.component';
import { ViewProfileComponent } from './features/view-profile/view-profile.component';
import { AuthGuardService } from './shared/intercepter/authGaurd/auth-guard.service';

const routes: Routes = [
    {path:'view-profile', component:ViewProfileComponent, canActivate:[AuthGuardService]},
    {path:'task-view', component:TaskViewComponent, canActivate:[AuthGuardService]},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
