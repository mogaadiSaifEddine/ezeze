export class FieldData implements FieldDataParams {
  showLabel: boolean;
  showCorrectValue: boolean;
  showPlaceholder: boolean;
  showValue: boolean;
  showSelectType: boolean;

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
    this.showOrder = false;
    this.placeHolder = 'placeholder';
    this.valueHolder = 'value';
    this.labelHolder = 'label';
    this.correctValueHolder = 'correct value';
  }

  showNone() {
    this.showLabel = false;
    this.showCorrectValue = false;
    this.showPlaceholder = false;
    this.showValue = false;
    this.showOrder = false;
  }
  // TODO
  showOnly(attrs: FieldDataShowParam[]): void {
    this.showNone();
    for (const param of attrs) {
      this[param] = true;
    }
  }
}
export type FieldDataShowParam = 'showLabel' | 'showCorrectValue' | 'showPlaceholder' | 'showOrder' | 'showValue';
export type FieldDataPlaceholderParam = 'placeHolder' | 'labelHolder' | 'correctValueHolder' | 'valueHolder';
export interface FieldDataParams {
  showLabel: boolean;
  showCorrectValue: boolean;
  showPlaceholder: boolean;
  showValue: boolean;
  showOrder: boolean;
  placeHolder: string;
  valueHolder: string;
  labelHolder: string;
  correctValueHolder: string;
}
