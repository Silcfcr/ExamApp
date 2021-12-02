import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bicycles-app';
  allUsers: any;
  constructor(private _HttpService: HttpService) { }

  ngOnInit(): void {

  }

  public getAllUsers(): void {
    console.log( "We are going to fetch the user list!" );
    let observable = this._HttpService.getAll();;
    observable.subscribe((data: any) => {
      console.log(data);
      this.allUsers = data;
    })
    console.log("i got here")

  }
}
