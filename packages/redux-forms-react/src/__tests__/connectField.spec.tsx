/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';

import connectField from '../connectField';


const MyComp: any = () => (
  <div className="Component" />
);

MyComp.displayName = 'MyComp';

const Decorated: any = connectField(MyComp);

const context = {
  context: {
    reduxFormLite: 'test',
  },
  childContextTypes: {
    reduxFormLite: React.PropTypes.string.isRequired,
  },
};


describe('#connectField', () => {
  it('should not mount', () => {
    const mountFn = () => mount(<Decorated />);

    expect(mountFn).toThrowError(/Form/);
  });

  it('should keep the original name', () => {
    const wrapper = mount(<Decorated name="field" />, context);

    expect(wrapper.name()).toBe('MyComp');
  });

  it('should provide a reference to the original', () => {
    expect(Decorated.WrappedComponent).toBe(MyComp);
  });

  it('should provide form name', () => {
    const wrapper = mount(<Decorated name="field" />, context);

    expect(wrapper.find(MyComp).prop('_form')).toBe('test');
  });
});
