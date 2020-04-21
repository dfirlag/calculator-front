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

  calculateExpression(expression: string) {
    expression = encodeURIComponent(expression);

    let params = new HttpParams()
    .set("expression", expression);

    return this
      .httpClient
      .get("http://localhost:8080/calculator/get-calculated-expression", { params: params, responseType: "json"})
      .pipe(
        catchError(this.handleError<any>('calculateExpression', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
