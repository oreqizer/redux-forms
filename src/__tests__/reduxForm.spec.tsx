/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';

import reduxForm from '../reduxForm';
import { form } from '../utils/containers';


// NOTE:
// When un-connecting ReduxForm from the decorator, mock the necessary props.
// state:
// _form: Form
// _values: Object
// _valid: boolean
// actions:
// _addForm: AddFormCreator
// _removeForm: RemoveFormCreator
// _touchAll: TouchAllCreator
// _submitStart: SubmitStartCreator
// _submitStop: SubmitStopCreator

const MyComp = () => (
  <div className="Component" />
);


describe('#reduxForm', () => {
  it('should require name to be passed', () => {
    const badOpts: any = {};

    expect(() => reduxForm(badOpts)).toThrowError(/is a required string/);
  });

  it('should require form to be a string', () => {
    const badOpts: any = { form: 123 };

    expect(() => reduxForm(badOpts)).toThrowError(/is a required string/);
  });

  it('should have a correct name', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    expect(Decorated.displayName).toBe('ReduxForm');
  });

  it('should provide original component static reference', () => {
    const Expected = reduxForm({ form: 'test' })(MyComp).WrappedComponent;

    expect(Expected).toBe(MyComp);
  });

  it('should add a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const addForm = jest.fn();
    const wrapper = mount((
        <Decorated
          _form={null}
          _values={{}}
          _valid={false}
          _addForm={addForm}
          _removeForm={jest.fn()}
          _touchAll={jest.fn()}
          _submitStart={jest.fn()}
          _submitStop={jest.fn()}
        />
      ));

    expect(addForm).toBeCalledWith('test');
  });

  it('should not add a form if already present', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const addForm = jest.fn();
    const wrapper = mount((
      <Decorated
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={addForm}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect(addForm).not.toBeCalled();
  });

  it('should remove a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const removeForm = jest.fn();
    const wrapper = mount((
      <Decorated
        _form={null}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={removeForm}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect(removeForm).not.toBeCalled();

    wrapper.unmount();

    expect(removeForm).toBeCalledWith('test');
  });

  it('should not remove a form if persistent', () => {
    const Decorated = reduxForm({ form: 'test', persistent: true })(MyComp).WrappedForm;

    const removeForm = jest.fn();
    const wrapper = mount((
      <Decorated
        _form={null}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={removeForm}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect(removeForm).not.toBeCalled();

    wrapper.unmount();

    expect(removeForm).not.toBeCalled();
  });

  it('should not render without form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount((
      <Decorated
        _form={null}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should not pass any private props', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount((
      <Decorated
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect(wrapper.find(MyComp).prop('_form')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_values')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_valid')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_addForm')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_removeForm')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_touchAll')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_submitStart')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_submitStop')).toBeUndefined();
  });

  it('should provide onSubmit', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount((
      <Decorated
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect(wrapper.find(MyComp).prop('onSubmit')).toBeDefined();
  });

  it('should not fire onSubmit if invalid', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const onSubmit = jest.fn();
    const wrapper = mount((
      <Decorated
        onSubmit={onSubmit}
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    wrapper.find(MyComp).prop('onSubmit')();

    expect(onSubmit).not.toBeCalled();
  });

  it('should fire onSubmit', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const onSubmit = jest.fn();
    const wrapper = mount((
      <Decorated
        onSubmit={onSubmit}
        _form={form}
        _values={{ test: 'yo' }}
        _valid={true}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    wrapper.find(MyComp).prop('onSubmit')();

    expect(onSubmit).toBeCalledWith({ test: 'yo' });
  });

  it('should fire submit start and stop', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    let cb: Function = (id: any) => id;
    const then = (fn: Function) => { cb = fn; };

    const onSubmit: any = () => ({ then });
    const submitStart = jest.fn();
    const submitStop = jest.fn();
    const wrapper = mount((
      <Decorated
        onSubmit={onSubmit}
        _form={form}
        _values={{}}
        _valid={true}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={submitStart}
        _submitStop={submitStop}
      />
    ));

    expect(submitStart).not.toBeCalled();

    wrapper.find(MyComp).prop('onSubmit')();

    expect(submitStart).toBeCalled();
    expect(submitStop).not.toBeCalled();

    cb();

    expect(submitStop).toBeCalled();
  });

  it('should provide context', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount((
      <Decorated
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    expect((wrapper.instance() as any).getChildContext()).toEqual({
      reduxFormLite: {
        form: 'test',
        context: '',
      },
    });
  });
});
