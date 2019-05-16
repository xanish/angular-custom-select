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
    disable: false,
    showCheckboxes: true,
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
      {id: 1, name: 'Spiderman'},
      {id: 3, name: 'Thor'},
    ]
  };

  handleChangeEvent($event) {
    console.log('Change Event Triggered');
    console.log($event);
  }
  
  handleCloseEvent($event) {
    console.log('Close Event Triggered');
  }

  handleSelectEvent($event) {
    console.log('Select Event Triggered');
    console.log($event);
  }
}
