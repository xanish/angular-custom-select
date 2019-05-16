import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgSelectComponent } from './ng-select/ng-select.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, NgSelectComponent, ClickOutsideDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
