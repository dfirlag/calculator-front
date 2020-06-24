import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  result$: string = "none";

  constructor(private httpClient: HttpClient) {
  }

  deleteExpression(id: number) {
    return this
      .httpClient
      .delete("http://localhost:8080/expression/delete-expression/" + id)
      .pipe(
        catchError(this.handleError<any>('calculateExpression'))
      );
  }

  calculateExpression(expression: string) {
    expression = encodeURIComponent(expression);

    let params = new HttpParams()
    .set("expression", expression);

    return this
      .httpClient
      .get("http://localhost:8080/calculator/get-calculated-expression", { params: params, responseType: "json"})
      .pipe(
        catchError(this.handleError<any>('calculateExpression'))
      );
  }

  saveExpression(expression: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    let json = JSON.stringify({expression: expression});
    return this
      .httpClient
      .post("http://localhost:8080/expression/save-expression", json, {headers: headers})
      .pipe(
        catchError(this.handleError<any>('calculateExpression'))
      );
  }

  loadExpressions() {
    return this
      .httpClient
      .get("http://localhost:8080/expression/get-saved-expressions")
      .pipe(
        catchError(this.handleError<any>('calculateExpression'))
      );
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if (error.error.hasOwnProperty("message")) {
        result = {errorMessage: error.error.message};
      }

      return of(result as any);
    };
  }
}
