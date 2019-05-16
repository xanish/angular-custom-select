import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  cso = {
    compareLabelWith: 'name',
    closeOnSelect: true,
    searchable: true,
    multiple: true,
    placeholder: 'Select Superhero',
    loading: false,
    loadingText: 'Loading Items...',
    notFoundText: 'No Items Found!',
    items: [
      {value: {id: 1, name: 'Spiderman'}, label: 'Spiderman'},
      {value: {id: 2, name: 'Iron Man'}, label: 'Iron Man'},
      {value: {id: 3, name: 'Thor'}, label: 'Thor'},
      {value: {id: 4, name: 'Captain America'}, label: 'Captain America'},
    ],
    model: [
      {name: 'Spiderman'}, {name: 'Thor'}
    ]
  };
  
}
