import { Component, OnInit, Input } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormsModule }   from '@angular/forms';

import { CalculatorService } from "./calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  expressionList$: [];
  result$: string = "-";
  expression$: string = "-";
  errorMessage$: string = "-";
  invalidExpression$ = false;
  emptyExpression$ = false;
  isError$ = false;

  constructor(
    private calculatorQueryService: CalculatorService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadExpressions();
  }

  public deleteExpression(id: number): void {
    this.ngxService.start();

    this.calculatorQueryService
      .deleteExpression(id)
        .subscribe((res) => {
          this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId

          if (res && res.hasOwnProperty("errorMessage")) {
            this.isError$ = true;
            this.errorMessage$ = res.errorMessage;
          }

          this.loadExpressions();
        });
  }

  public loadExpressions(): void {
    this.ngxService.start();

    this.calculatorQueryService
      .loadExpressions()
        .subscribe((res) => {
          this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId

          if (res && res.hasOwnProperty("errorMessage")) {
            this.isError$ = true;
            this.errorMessage$ = res.errorMessage;
          } else if (res.length == 0) {
            this.invalidExpression$ = true
            this.result$ = "-";
            return;
          }

          if (res && res.hasOwnProperty("list")) {
            this.expressionList$ = res.list;
          }
        });
  }

  public saveExpression(expression: string): void {
    this.ngxService.start();

    this.calculatorQueryService
      .saveExpression(expression)
        .subscribe((res) => {
          this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId

          if (res && res.hasOwnProperty("errorMessage")) {
            this.isError$ = true;
            this.errorMessage$ = res.errorMessage;
          }

          this.result$ = "-";
          this.expression$ = "-";

          this.loadExpressions();
        });
  }

  public calculateExpression(expression: string): void {
    this.ngxService.start();
    this.invalidExpression$ = false;
    this.isError$ = false;
    this.errorMessage$ = "";
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

          if (res && res.hasOwnProperty("errorMessage")) {
            this.isError$ = true;
            this.errorMessage$ = res.errorMessage;
          } else if (res.length == 0) {
            this.invalidExpression$ = true
            this.result$ = "-";
            return;
          }

          if (res && res.hasOwnProperty("double")) {
            this.result$ = res["double"];
          }
        });
  }
}
