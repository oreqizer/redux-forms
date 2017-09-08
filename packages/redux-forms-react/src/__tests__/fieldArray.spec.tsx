/* eslint-disable react/prop-types */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import reducer from 'redux-forms/lib/index';
import { form, field } from 'redux-forms/lib/containers';
import fieldArray from '../FieldArray';


// NOTE:
// We're unwrapping 'FieldArray' from 'connect' and 'connectFieldArray'.
// Props needed mocking:
// - _form: string
// state:
// - _array: string[]
// actions:
// - _addArray: AddArrayCreator
// - _arrayPush: ArrayPushCreator
// - _arrayPop: ArrayPopCreator
// - _arrayUnshift: ArrayUnshiftCreator
// - _arrayShift: ArrayShiftCreator
// - _arrayInsert: ArrayInsertCreator
// - _arrayRemove: ArrayRemoveCreator
// - _arraySwap: ArraySwapCreator
const Component = (props: any) => (
  <div className="Component" />
);

const ConnectedFieldArray = fieldArray(Component);

const FieldArray = (ConnectedFieldArray as any).WrappedComponent.WrappedComponent;

const options = {
  context: {
    reduxForms: 'test',
  },
  childContextTypes: {
    reduxForms: PropTypes.string.isRequired,
  },
};

const event = { target: { value: 'doge' } };

const MyComp = () => (
  <div className="MyComp" />
);

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}), {
  reduxForms: { test: form },
});

const getForm = (state: any) => state.getState().reduxForms.test;


describe('#FieldArray', () => {
  it('should have a correct name', () => {
    const wrapper = mount((
      <FieldArray
        name="array"
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.name()).toBe('FieldArray');
  });

  it('should not add an array', () => {
    const addArray = jest.fn();
    const wrapper = mount((
      <FieldArray
        name="array"
        _array={1}
        _addArray={addArray}
      />
    ));

    expect(addArray).not.toBeCalled();
  });

  it('should add an array', () => {
    const addArray = jest.fn();
    const wrapper = mount((
      <FieldArray
        name="array"
        _form="form"
        _addArray={addArray}
      />
    ));

    expect(addArray).toBeCalledWith('form', 'array');
  });

  it('should provide array length', () => {
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPush={jest.fn()}
      />
    ));

    expect(wrapper.prop('fields').length).toBe(1);
  });

  it('should handle map', () => {
    const wrapper = shallow((
      <FieldArray
        name="array"
        _array={2}
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.prop('fields').map(R.identity)).toEqual(['array.0', 'array.1']);
  });

  it('should handle map of indexes', () => {
    const wrapper = shallow((
      <FieldArray
        name="array"
        _array={2}
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.prop('fields').map((_: any, i: number) => i)).toEqual([0, 1]);
  });

  it('should handle push', () => {
    const push = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPush={push}
      />
    ));

    wrapper.prop('fields').push();

    expect(push).toBeCalledWith('form', 'array');
  });

  it('should not handle pop', () => {
    const pop = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={0}
        _addArray={jest.fn()}
        _arrayPop={pop}
      />
    ));

    wrapper.prop('fields').pop();

    expect(pop).not.toBeCalled();
  });

  it('should handle pop', () => {
    const pop = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPop={pop}
      />
    ));

    wrapper.prop('fields').pop();

    expect(pop).toBeCalledWith('form', 'array');
  });

  it('should handle unshift', () => {
    const unshift = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayUnshift={unshift}
      />
    ));

    wrapper.prop('fields').unshift();

    expect(unshift).toBeCalledWith('form', 'array');
  });

  it('should not handle shift', () => {
    const shift = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={0}
        _addArray={jest.fn()}
        _arrayShift={shift}
      />
    ));

    wrapper.prop('fields').shift();

    expect(shift).not.toBeCalled();
  });

  it('should handle shift', () => {
    const shift = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayShift={shift}
      />
    ));

    wrapper.prop('fields').shift();

    expect(shift).toBeCalledWith('form', 'array');
  });

  it('should handle insert', () => {
    const insert = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayInsert={insert}
      />
    ));

    wrapper.prop('fields').insert(1);

    expect(insert).toBeCalledWith('form', 'array', 1);
  });

  it('should handle remove', () => {
    const remove = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayRemove={remove}
      />
    ));

    wrapper.prop('fields').remove(1);

    expect(remove).toBeCalledWith('form', 'array', 1);
  });

  it('should handle swap', () => {
    const swap = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arraySwap={swap}
      />
    ));

    wrapper.prop('fields').swap(0, 1);

    expect(swap).toBeCalledWith('form', 'array', 0, 1);
  });

  it('should handle move', () => {
    const move = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayMove={move}
      />
    ));

    wrapper.prop('fields').move(0, 1);

    expect(move).toBeCalledWith('form', 'array', 0, 1);
  });

  it('should not render without an array', () => {
    const wrapper = mount((
      <FieldArray
        name="array"
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render a component', () => {
    const wrapper = mount((
      <FieldArray
        name="array"
        _array={1}
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.find('.Component').length).toBe(1);
  });
});


describe('#connect(FieldArray)', () => {
  it('should not mount without context', () => {
    const store = newStore();
    const wrapperFn = () => mount((
      <Provider store={store}>
        <ConnectedFieldArray name="test">
          <MyComp />
        </ConnectedFieldArray>
      </Provider>
    ));

    expect(wrapperFn).toThrowError(/Form/);
  });

  it('should have a correct name', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    );

    expect(wrapper.find(ConnectedFieldArray).name()).toBe('FieldArray');
  });

  it('should add an array', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    );

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should push a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').push();

    expect(getForm(store).arrays).toEqual({ test: 1 });
  });

  it('should pop a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').push();
    wrapper.prop<any>('fields').pop();

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should unshift a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').unshift();

    expect(getForm(store).arrays).toEqual({ test: 1 });
  });

  it('should shift a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').unshift();
    wrapper.prop<any>('fields').shift();

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should insert a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').insert(0);

    expect(getForm(store).arrays).toEqual({ test: 1 });
  });

  it('should remove a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').insert(0);
    wrapper.prop<any>('fields').remove(0);

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should map fields', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray name="test">
            <MyComp />
          </ConnectedFieldArray>
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop<any>('fields').push();
    wrapper.prop<any>('fields').push();

    expect(wrapper.prop<any>('fields').map(R.identity)).toEqual(['test.0', 'test.1']);
  });
});
