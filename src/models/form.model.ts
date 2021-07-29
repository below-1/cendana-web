export type Rule = () => (true | string);

export interface BaseFormDescriptor {
  name: string;
  label: string;
  field: string;
  rules?: Rule[];
  // control: 'simple-string' | 'textarea' | 'number' | 'select' | 'radio';
  // max?: number;
  // min?: number;
  // step?: number;
}

export interface StringDescriptor extends BaseFormDescriptor {
  control: 'string';
}

export interface TextAreaDescriptor extends BaseFormDescriptor {
  control: 'textarea';
}

export interface NumberDescriptor extends BaseFormDescriptor {
  control: 'number';
  max?: number;
  min?: number;
  step?: number;
}

export interface SelectItem {
  value: any;
  label: string;
}

export interface StaticSelectDescriptor extends BaseFormDescriptor {
  control: 'select',
  options: SelectItem[];
}

export type FormDescriptor = StringDescriptor | TextAreaDescriptor |
  NumberDescriptor | StaticSelectDescriptor;
