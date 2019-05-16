import {
  Component,
  OnChanges,
  SimpleChanges,
  forwardRef,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectOption } from '../ng-select-option.model';

@Component({
  selector: 'app-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgSelectComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgSelectComponent implements OnChanges, ControlValueAccessor {

  @Input() compareLabelWith: string = 'label';
  @Input() closeOnSelect: boolean = true;
  @Input() searchable: boolean = true;
  @Input() multiple: boolean = false;
  @Input() placeholder: string;
  @Input() loading: boolean = true;
  @Input() loadingText: string = 'Loading';
  @Input() notFoundText: string = 'Items not found';

  @Input()
  get items() { return this._items; };
  set items(__items: Array<NgSelectOption>) { this._items = __items; };

  @Output() openEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();
  @Output() deselectEvent = new EventEmitter();
  @Output() changeEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();

  @ViewChild('filterInput') filterInput: ElementRef;

  options: Array<NgSelectOption> = [];
  filterValue: string = '';
  isOpen: boolean = false;

  private _items: Array<any> = [];
  private _filtered: Array<any> = [];
  get filtered() { return this._filtered; };
  get selected() { return this._items.filter(i => i.selected === true); };

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this._items = changes.items.currentValue || [];
      this._filtered = this._filterItems(this._items, this.filterValue);
    }
  }

  writeValue(value: Array<any>): void {
    if (value != null && this._items.length) {

      if (this.multiple && value.length === 0) {
        return;
      }

      if (!this.multiple && value.length > 0) {
        console.warn('Multiple selected values passed to ngModel for single select');
        return;
      }

      if (!(value instanceof Array)) {
        console.warn('ngModel expects an array object');
        return;
      }

      this._clearSelectedItems();

      value.forEach(v => {

        const index = this._items.findIndex(i => {

          if (typeof v === "object") {
            return i.label === v[this.compareLabelWith];
          } else {
            return i.label === v;
          }
        });

        this._items[index].selected = true;

      });
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.registerOnTouched = fn;
  }

  handleFilter(value: string) {
    this.filterValue = value;
    this._filtered = this._filterItems(this._items, value);
  }

  handleBlur(event) {
    if (!this.isOpen) {
      this._onTouched();
    }
  }

  handleFocus(event) {
    this.open();
  }

  toggleItem(item: NgSelectOption) {
    if (this.multiple && item.selected) {

      item.selected = false;
      this.deselectEvent.emit(item);

    } else {

      if (!this.multiple) {
        this._items.forEach(i => i.selected = false)
      } else {
        this.selectEvent.emit(item);
      }

      item.selected = true;

    }

    if (this.closeOnSelect && !this.multiple) {
      this.close();
    }

    this._updateNgModel();
  }

  open() {
    this.isOpen = true;
    this.openEvent.emit();
  }

  close() {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.filterValue = '';
    this._clearFilteredItems();
    this.closeEvent.emit();
  }

  private _filterItems(items, filterValue) {
    return items.filter(i => i.label.toUpperCase().includes(filterValue.toUpperCase()));
  }

  private _clearSelectedItems() {
    this._items.forEach(i => i.selected = false);
  }

  private _clearFilteredItems() {
    this._filtered = [...this._items];
  }

  private _updateNgModel() {
    const model = [];
    for (const item of this._items) {

      if (item.selected) {
        model.push(item.value);
      }

    }

    const selected = this._items.map(i => i.value);
    if (this.multiple) {

      this._onChange(model);
      this.changeEvent.emit(selected);

    } else {

      this._onChange(model[0] != null ? model[0] : null);
      this.changeEvent.emit(selected[0]);

    }
  }

}