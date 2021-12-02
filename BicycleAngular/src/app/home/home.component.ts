import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allUsers : any;
  currentUser : any;
  contactUser : any;
  
  constructor(private _HttpService: HttpService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contactUser = null;
    let observable = this._HttpService.validateUser();
    observable.subscribe((data:any) => {
      console.log(data);
      this.currentUser = data;
      this.getAllUsers()
    },
    (error:any) => {
      this._router.navigate(['/login']);
    })
    
    
  }

  getAllUsers(): void {
    console.log( "Getting al bikes and users" );
    let observable = this._HttpService.getAll();;
    observable.subscribe((data: any) => {
      console.log(data);
      this.allUsers = data;
    })
    console.log("i got here")

  }
  contactInfo(userEmail: string) : void {
    console.log(userEmail);
    let observable = this._HttpService.getOneByEmail(userEmail)
    observable.subscribe((data:any) => {
      console.log(data);
      this.contactUser = data;
    })
    
  }
  deleteBike(bikeId: string) : void {
    let observable = this._HttpService.DeleteBike(bikeId)
    observable.subscribe((data:any) => {
      console.log(data, "bike has been erased");
      this.getAllUsers();
    })
  }

  logout(): void {
    let observable = this._HttpService.logoutUser()
    observable.subscribe((data:any) => {
      console.log(data);
      this._router.navigate(['/login'])
    })
  }

}
