export class NgSelectOption {
  label: string;
  value: string | Object;
  selected: boolean;
  disabled: boolean;

  constructor(
    label: string,
    value: string | Object,
    selected: boolean = false,
    disabled: boolean = false) {
      this.label = label;
      this.value = value;
      this.selected = selected;
      this.disabled = disabled;
    }
}
