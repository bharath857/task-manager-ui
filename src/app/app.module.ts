import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponent } from './features/header/header.component';
import { AuthInterceptor } from './shared/intercepter/auth/auth.interceptor';
import { ViewProfileComponent } from './features/view-profile/view-profile.component';
import { RouterModule } from '@angular/router';
import { TaskViewComponent } from './features/task-view/task-view.component';
import { SpinnerInterceptorService } from './shared/intercepter/spinner/spinner-interceptor/spinner-interceptor.service';
import { SpinnerComponent } from './shared/intercepter/spinner/spinner/spinner.component';
import { CustomPaginator } from './shared/material/CustomPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    HeaderComponent,
    ViewProfileComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass:SpinnerInterceptorService,
    multi:true 
  },
  { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
