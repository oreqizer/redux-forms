/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import * as R from "ramda";

import reduxForm from '../reduxForm';
import reducer from '../formsReducer';
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

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxFormLite: reducer,
}), {
  reduxFormLite: { test: form },
});

const getForm = (state: any) => state.getState().reduxFormLite.test;

const event = (pd: Function) => ({
  preventDefault: pd,
});


describe('#reduxForm', () => {
  it('should require name to be passed', () => {
    const badOpts: any = {};

    expect(() => reduxForm(badOpts)).toThrowError(/"reduxForm"/);
  });

  it('should require form to be a string', () => {
    const badOpts: any = { form: 123 };

    expect(() => reduxForm(badOpts)).toThrowError(/"reduxForm"/);
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

    expect(wrapper.find(MyComp).prop('withRef')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_form')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_values')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_valid')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_addForm')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_removeForm')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_touchAll')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_submitStart')).toBeUndefined();
    expect(wrapper.find(MyComp).prop('_submitStop')).toBeUndefined();
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
      reduxFormLite: 'test',
    });
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

  it('should prevent default with onSubmit', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const pd = jest.fn();
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

    expect(pd).not.toBeCalled();

    wrapper.find(MyComp).prop('onSubmit')(event(pd));

    expect(pd).toBeCalled();
  });

  it('should not fire onSubmit if invalid', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const pd = jest.fn();
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

    wrapper.find(MyComp).prop('onSubmit')(event(pd));

    expect(pd).toBeCalled();
    expect(onSubmit).not.toBeCalled();
  });

  it('should fire onSubmit', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const touchAll = jest.fn();
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Decorated
        onSubmit={onSubmit}
        _form={form}
        _values={{ test: 'yo' }}
        _valid={true}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={touchAll}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      />
    ));

    wrapper.find(MyComp).prop('onSubmit')(event(jest.fn()));

    expect(touchAll).toBeCalled();
    expect(onSubmit).toBeCalledWith({ test: 'yo' });
  });

  it('should fire submit start and stop', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    let cb: Function = (id: any) => id;
    const then = (fn: Function) => { cb = fn; };

    const pd = jest.fn();
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

    wrapper.find(MyComp).prop('onSubmit')(event(pd));

    expect(pd).toBeCalled();
    expect(submitStart).toBeCalled();
    expect(submitStop).not.toBeCalled();

    cb();

    expect(submitStop).toBeCalled();
  });

  it('should fire ref callback on mount', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const withRef = jest.fn();
    const wrapper = mount((
      <Decorated
        withRef={withRef}
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

    expect(withRef).toBeCalled();
  });
});


describe('#connect(reduxForm)', () => {
  it('should error out without opitons', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Decorated />
      </Provider>
    ));

    expect(store.getState().reduxFormLite).toEqual({ test: form });
  });

  it('should mount an unnamed component', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Decorated />
      </Provider>
    ));

    expect(wrapper.find(Decorated).name()).toBe('ReduxForm(Component)');
  });

  it('should name a component with a name', () => {
    const Dummy: any = () => <MyComp />;

    Dummy.displayName = 'Dummy';

    const Decorated = reduxForm({ form: 'test' })(Dummy);

    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Decorated />
      </Provider>
    ));

    expect(wrapper.find(Decorated).name()).toBe('ReduxForm(Dummy)');
  });

  it('should add a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Decorated />
      </Provider>
    ));

    expect(store.getState().reduxFormLite).toEqual({ test: form });
  });

  it('should remove a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Decorated />
      </Provider>
    ));

    wrapper.unmount();

    expect(store.getState().reduxFormLite).toEqual({});
  });

  it('should supply a form prop', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Decorated />
      </Provider>
    ));

    expect(wrapper.find(Decorated.WrappedForm).prop('_form')).toEqual(form);
  });
});
