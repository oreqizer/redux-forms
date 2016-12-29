import Field from './Field';
import FieldArray from './FieldArray';
import reducer from './formsDuck';
import reduxForm from './reduxForm';

import {
  valueSelector,
  errorSelector,
  isValid,
  isTouched,
} from './selectors';


export {
  Field,
  FieldArray,
  reducer,
  reduxForm,

  // selectors
  // ---
  valueSelector,
  errorSelector,
  isValid,
  isTouched,
};
