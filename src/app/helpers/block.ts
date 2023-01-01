export class FieldData {
  showLabel: boolean;
  showCorrectValue: boolean;
  showPlaceholder: boolean;
  showValue: boolean;
  showOrder: boolean;
  placeHolder = 'placeholder';
  valueHolder = 'value';
  labelHolder = 'label';
  correctValueHolder = 'correct value';

  constructor() {}

  resetFieldData() {
    this.showLabel = true;
    this.showCorrectValue = true;
    this.showPlaceholder = true;
    this.showValue = true;
    this.showOrder = true;
    this.placeHolder = 'placeholder';
    this.valueHolder = 'value';
    this.labelHolder = 'label';
    this.correctValueHolder = 'correct value';
  }
}
