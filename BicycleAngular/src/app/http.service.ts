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

  CreateOnePost(userName: string,newPost: any ) {
    console.log("service", newPost)
    return this._http.post(`http://localhost:5000/api/${userName}`, newPost)
}
getOnePost(id: string){
  return this._http.get(`http://localhost:5000/api/post/${id}`);
}

  UpdateOne( id: string, updateTask: any) {
    return this._http.put(`http://localhost:5000/api/${id}`, updateTask)
  }

  DeleteOne(id: string ){
    return this._http.delete(`http://localhost:5000/api/${id}`)
  }

  DeletePost(id: string, currentUserName: string) {
    console.log(id, currentUserName, "in the http service")
    return this._http.delete(`http://localhost:5000/api/delete/${id}`, {
      body: {
        userName: currentUserName
      }
    });
  }

  updateVotesInPost(post: any) {
    return this._http.put(`http://localhost:5000/api/vote/${post._id}`, post);
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
