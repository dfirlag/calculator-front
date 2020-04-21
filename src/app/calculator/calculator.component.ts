import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormsModule }   from '@angular/forms';

import { CalculatorService } from "./calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  result$: string = "-";
  expression$: string = "-";
  invalidExpression$ = false;
  emptyExpression$ = false;

  constructor(
    private calculatorQueryService: CalculatorService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
  }

  public calculateExpression(expression: string): void {
    this.ngxService.start();
    this.invalidExpression$ = false;
    this.emptyExpression$ = false;
    this.expression$ = expression;

    if (this.expression$.length == 0) {
      this.ngxService.stop();
      this.emptyExpression$ = true;
      return;
    }

    this.calculatorQueryService
      .calculateExpression(expression)
        .subscribe((res) => {
            this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId

            if (res.length == 0) {
              this.invalidExpression$ = true
              this.result$ = "-";
              return;
            }

           console.log(res);
           if (res.hasOwnProperty("double")) {
             this.result$ = res["double"];
           }
         });
  }
}
