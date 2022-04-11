import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // public getSearchResults(searchRecipe: any) {
  //   return new Promise((resolve, reject) => {
  //     let apistring = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchRecipe + "&number=5&apiKey=3a98848802494964b212e9c85cf3d986";
  //     this.http.get<any>(apistring)
  //       .subscribe(
  //         (res) => {
  //           resolve(res);
  //         },
  //         (err) => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }

  getSearchResults(searchRecipe: string): Observable<any> {
    // let apistring =
    //   'https://api.spoonacular.com/recipes/complexSearch?query=' +
    //   searchRecipe +
    //   '&number=5&apiKey=3a98848802494964b212e9c85cf3d986';

    let apistring = 'http://localhost:8000/api/foodie?query=' + searchRecipe;

    return this.http
      .get<any>(apistring, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  public getRecipeInformation(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=3a98848802494964b212e9c85cf3d986`
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  public getInstructions(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=3a98848802494964b212e9c85cf3d986`
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
