import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getAll() {
    return this._http.get('http://localhost:5000/api/');
  }
  getOne(id: string){
    return this._http.get(`http://localhost:5000/api/${id}`);
  }
  getOneByEmail(id: string){
    return this._http.get(`http://localhost:5000/api/${id}/email`);
  }
  
  CreateOne(newUser: any) {
      return this._http.post('http://localhost:5000/api/', newUser)
  }

  CreateOneBike(email: string,newBike: any ) {
    console.log("service", newBike)
    return this._http.post(`http://localhost:5000/api/${email}`, newBike)
}

  UpdateOne( id: string, updateTask: any) {
    return this._http.put(`http://localhost:5000/api/${id}`, updateTask)
  }

  DeleteOne(id: string ){
    return this._http.delete(`http://localhost:5000/api/${id}`)
  }

  DeleteBike(id: string, currentUserEmail: string) {
    return this._http.delete(`http://localhost:5000/api/bike/${id}`, {
      body: {
        userEmail: currentUserEmail
      }
    })

  }
  loginUser( currentUser: any ){
    console.log( currentUser );
    return  this._http.post( "http://localhost:5000/api/user/login", currentUser );
  }

  validateUser(): any {
    return this._http.get( "http://localhost:5000/api/user/validate" );
  }

  logoutUser(): any {
    return this._http.get( 'http://localhost:5000/api/user/logout' );
  }
}
