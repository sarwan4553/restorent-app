import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:3000/posts";
  constructor(private _http: HttpClient) { }
  // now we will be defined the POST, GET, DELETE AND PUT
  // Create Restorent using the post method
  postRestorent(data: any) {
    return this._http.post<any>(this.baseUrl, data).pipe(map((res: any) => {
      return res;
    }))
  }
  // get restorent data using get method
  getRestorent() {
    return this._http.get<any>(this.baseUrl).pipe(map((res: any) => {
      return res;
    }))
  }
  // update restorent data
  updateRestorent(data: any, id: number) {
    return this._http.put<any>("http://localhost:3000/posts/"+id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  // delete restorent using delete methods
  deleteRestorent(id: number) {
    return this._http.delete<any>(this.baseUrl + "/" + id).pipe(map((res: any) => {
      return res;
    }))

  }
}
