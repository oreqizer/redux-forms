import { isEvent } from './helpers';


export type Target = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;


const getSelectedValues = (options: HTMLOptionsCollection): string[] => Array.from(options)
    .filter((option) => option.selected)
    .map((option) => option.value);

const getValue = (ev: React.SyntheticEvent<Target> | any): any => {
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
