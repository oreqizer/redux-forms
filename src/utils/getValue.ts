import * as React from 'react';

import { isEvent } from './helpers';


export type Target = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type Value = string | string[] | boolean | FileList | null;


const getSelectedValues = (options: HTMLOptionsCollection): string[] => Array.from(options)
    .filter((option) => option.selected)
    .map((option) => option.value);

const getValue = (ev: any): Value => {
  if (!isEvent(ev)) {
    return ev;
  }

  const target = ev.target as Target;

  switch (target.type) {
    case 'checkbox':
      return (target as HTMLInputElement).checked;
    case 'file':
      return (target as HTMLInputElement).files;
    case 'select-multiple':
      return getSelectedValues((target as HTMLSelectElement).options);
    default:
      return target.value;
  }
};

export default getValue;
