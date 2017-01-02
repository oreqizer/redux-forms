/// <reference types="jest" />

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

    expect(mountFn).toThrowError(/"reduxForm"/);
  });

  it('should keep the original name', () => {
    const wrapper = mount(<Decorated name="field" />, context);

    expect(wrapper.name()).toBe('MyComp');
  });

  it('should provide a reference to the original', () => {
    expect(Decorated.WrappedComponent).toBe(MyComp);
  });

  it('should provide form name from prop', () => {
    const wrapper = mount(<Decorated name="field" form="test" />);

    expect(wrapper.find(MyComp).prop('form')).toBe('test');
  });

  it('should provide form name from context', () => {
    const wrapper = mount(<Decorated name="field" />, context);

    expect(wrapper.find(MyComp).prop('form')).toBe('test');
  });

  it('should prefer form name from prop over context', () => {
    const wrapper = mount(<Decorated name="field" form="propz" />, context);

    expect(wrapper.find(MyComp).prop('form')).toBe('propz');
  });
});
