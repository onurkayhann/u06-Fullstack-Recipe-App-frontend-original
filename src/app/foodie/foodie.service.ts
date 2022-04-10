import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Foodie } from './foodie';

@Injectable({
  providedIn: 'root'
})
export class FoodieService {

  private apiURL = "http://localhost:8000/api/foodie/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Foodie[]> {
   return this.httpClient.get<Foodie[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(foodie: any): Observable<Foodie> {
   return this.httpClient.post<Foodie>(this.apiURL, JSON.stringify(foodie), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id: string): Observable<Foodie> {
   return this.httpClient.get<Foodie>(this.apiURL + id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id: string, foodie: any): Observable<Foodie> {
   return this.httpClient.put<Foodie>(this.apiURL + id, JSON.stringify(foodie), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id: string){
   return this.httpClient.delete<Foodie>(this.apiURL + id, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     errorMessage = error.error.message;
   } else {
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   return throwError(errorMessage);
 }

}
