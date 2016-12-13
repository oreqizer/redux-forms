/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';

import connectField from '../connectField';


const MyComp: any = () => (
  <div className="Component" />
);

const Decorated: any = connectField(MyComp);

const flat = {
  context: {
    reduxForms: {
      form: 'test',
      context: '',
    },
  },
  childContextTypes: {
    reduxForms: React.PropTypes.object.isRequired,
  },
};

const deep = {
  context: {
    reduxForms: {
      form: 'test',
      context: 'nested[0]',
    },
  },
  childContextTypes: {
    reduxForms: React.PropTypes.object.isRequired,
  },
};


describe('#connectField', () => {
  it('should not mount', () => {
    const mountFn = () => mount(<Decorated />);

    expect(mountFn).toThrowError(/decorated with "reduxForm"/);
  });

  it('should provide form name', () => {
    const wrapper = mount(<Decorated name="field" />, flat);

    expect(wrapper.find(MyComp).prop('_form')).toBe('test');
  });

  it('should provide a flat id', () => {
    const wrapper = mount(<Decorated name="field" />, flat);

    expect(wrapper.find(MyComp).prop('_id')).toBe('field');
  });

  it('should provide a deep id', () => {
    const wrapper = mount(<Decorated name="field" />, deep);

    expect(wrapper.find(MyComp).prop('_id')).toBe('nested[0].field');
  });
});
