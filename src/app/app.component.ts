import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager-ui';

  constructor(
    private router: Router){
      
    }
  getUserDetails(event:any){
    console.log(event)
    this.router.navigate(['task-view'])
  }
}
