import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule }   from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
//     !environment.production ? HttpClientInMemoryWebApiModule.forRoot(
//       CalculatorInMemoryDataService, { dataEncapsulation: false }
//     ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
