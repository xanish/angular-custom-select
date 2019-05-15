import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  // closeOnSelect: boolean = true;
  // searchable: boolean = true;
  // multiple: boolean = false;
  // maxSelectableItems: number;
  placeholder: string = 'Select Superhero';
  loading: boolean = false;
  // loadingText: string = 'Loading';
  // notFoundText: string = 'Items not found';
  items: Array<any> = [
    {value: {id: 1, name: 'Spiderman'}, label: 'Spiderman'},
    {value: {id: 2, name: 'Iron Man'}, label: 'Iron Man'},
    {value: {id: 3, name: 'Thor'}, label: 'Thor'},
    {value: {id: 4, name: 'Captain America'}, label: 'Captain America'},
  ];
  test: [];
}
