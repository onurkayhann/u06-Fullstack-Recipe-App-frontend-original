import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RecipeDetail, ResultModel } from './results/result.model';

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

  getSearchResults(
    searchRecipe: string,
    category: string,
    intolerance: string
  ): Observable<ResultModel> {
    let apistring =
      'https://api.spoonacular.com/recipes/complexSearch?query=' +
      searchRecipe +
      '&number=10&apiKey=3a98848802494964b212e9c85cf3d986';

    const withCategory = apistring.concat(
      category !== '' ? '&cuisine=' + category : ''
    );

    const withIntolerance = withCategory.concat(
      intolerance !== '' ? '&intolerance=' + intolerance : ''
    );

    return this.http
      .get<ResultModel>(withIntolerance, this.httpOptions)
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

  public getRecipeInformation(id: number): Observable<RecipeDetail> {
    let apiString = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=3a98848802494964b212e9c85cf3d986`;
    return this.http
      .get<RecipeDetail>(apiString, this.httpOptions)
      .pipe(catchError(this.errorHandler));
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
