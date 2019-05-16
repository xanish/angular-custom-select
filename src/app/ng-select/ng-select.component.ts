import {
  Component,
  OnChanges,
  SimpleChanges,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  HostListener,
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
  @Input() showCheckboxes: boolean = false;
  @Input() disable: boolean = false;
  @Input() placeholder: string;
  @Input() loading: boolean = true;
  @Input() loadingText: string = 'Loading';
  @Input() notFoundText: string = 'Items not found';

  @Input()
  get items() { return this._items; };
  set items(__items: Array<NgSelectOption>) { this._items = __items; };

  @Output('open') openEvent = new EventEmitter();
  @Output('select') selectEvent = new EventEmitter();
  @Output('deselect') deselectEvent = new EventEmitter();
  @Output('change') changeEvent = new EventEmitter();
  @Output('close') closeEvent = new EventEmitter();

  @ViewChild('filterInput') filterInput: ElementRef;

  options: Array<NgSelectOption> = [];
  filterValue: string = '';
  isOpen: boolean = false;

  private _focused: boolean = false;
  private _items: Array<any> = [];
  private _filtered: Array<any> = [];
  get filtered() { return this._filtered; };
  get selected() { return this._items.filter(i => i.selected === true); };

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(private _cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this._items = changes.items.currentValue || [];
      this._filtered = this._filterItems(this._items, this.filterValue);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    // TAB key is pressed
    if ($event.which === 9) {
      this._focused = false;
      this.close();
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
      this._cd.markForCheck();

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
    this._focused = false;
  }

  handleFocus(event) {
    if (this._focused) {
      return;
    }
    this.open();
    this._focused = true;
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
    if (!this.isOpen || this._focused) {
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