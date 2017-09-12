/* eslint-disable react/prop-types */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount } from 'enzyme';

import connectField from '../connectField';


const MyComp: any = () => (
  <div className="Component" />
);

MyComp.displayName = 'MyComp';

const Decorated: any = connectField(MyComp);

const context = {
  context: {
    reduxForms: 'test',
  },
  childContextTypes: {
    reduxForms: PropTypes.string,
  },
};


describe('#connectField', () => {
  it('should not mount', () => {
    const mountFn = () => mount(<Decorated />);

    expect(mountFn).toThrowError(/Form/);
  });

  it('should mount with prop', () => {
    const mountFn = () => mount(<Decorated form="form" />);

    expect(mountFn).not.toThrowError(/Form/);
  });

  it('should keep the original name', () => {
    const wrapper = mount(<Decorated />, context);

    expect(wrapper.name()).toBe('MyComp');
  });

  it('should provide a reference to the original', () => {
    expect(Decorated.WrappedComponent).toBe(MyComp);
  });

  it('should provide form name', () => {
    const wrapper = mount(<Decorated />, context);

    expect(wrapper.find(MyComp).prop('_form')).toBe('test');
  });

  it('should provide form name from prop', () => {
    const wrapper = mount(<Decorated form="prop" />);

    expect(wrapper.find(MyComp).prop('_form')).toBe('prop');
    expect(wrapper.find(MyComp).prop('form')).toBe('prop');
  });
});
