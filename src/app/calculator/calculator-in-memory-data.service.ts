import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class CalculatorInMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {};
  }

  calculateExpression(expression: string):string  {
    return "{\"double\":6.0}"
  }
}
