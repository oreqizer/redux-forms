/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import ConnectedFieldArray from '../FieldArray';
import reducer from '../formsReducer';
import { form, field } from '../utils/containers';


// NOTE:
// We're unwrapping 'FieldArray' from 'connect' and 'connectFieldArray'.
// Props needed mocking:
// - _form: string
// state:
// - _array: string[]
// actions:
// - _addArray: AddArrayCreator
// - _removeArray: RemoveArrayCreator
// - _arrayPush: ArrayPushCreator
// - _arrayPop: ArrayPopCreator
// - _arrayUnshift: ArrayUnshiftCreator
// - _arrayShift: ArrayShiftCreator
// - _arrayInsert: ArrayInsertCreator
// - _arrayRemove: ArrayRemoveCreator
// - _arraySwap: ArraySwapCreator
const FieldArray = (ConnectedFieldArray as any).WrappedComponent.WrappedComponent;

const Component = (props: any) => (
  <div className="Component" />
);

const options = {
  context: {
    reduxFormLite: 'test',
  },
  childContextTypes: {
    reduxFormLite: React.PropTypes.string.isRequired,
  },
};

const event = { target: { value: 'doge' } };

const eventFn = (pd: Function) => ({
  preventDefault: pd,
  stopPropagation: R.identity,
});

const MyComp = () => (
  <div className="MyComp" />
);

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxFormLite: reducer,
}), {
  reduxFormLite: { test: form },
});

const getForm = (state: any) => state.getState().reduxFormLite.test;


describe('#FieldArray', () => {
  it('should have a correct name', () => {
    const wrapper = mount((
      <FieldArray
        name="array"
        component={Component}
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
        component={Component}
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
        component={Component}
        _form="form"
        _addArray={addArray}
      />
    ));

    expect(addArray).toBeCalledWith('form', 'array');
  });

  it('should remove an array', () => {
    const removeArray = jest.fn();
    const wrapper = mount((
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _addArray={jest.fn()}
        _removeArray={removeArray}
      />
    ));

    wrapper.unmount();

    expect(removeArray).toBeCalledWith('form', 'array');
  });

  it('should provide array length', () => {
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
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
        component={Component}
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
        component={Component}
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
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPush={push}
      />
    ));

    wrapper.prop('fields').push();

    expect(push).toBeCalledWith('form', 'array');
  });

  it('should prevent default on push', () => {
    const pd = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPush={jest.fn()}
      />
    ));

    wrapper.prop('fields').push(eventFn(pd));

    expect(pd).toBeCalled();
  });

  it('should not handle pop', () => {
    const pop = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
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
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPop={pop}
      />
    ));

    wrapper.prop('fields').pop();

    expect(pop).toBeCalledWith('form', 'array');
  });

  it('should prevent default on pop', () => {
    const pd = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayPop={jest.fn()}
      />
    ));

    wrapper.prop('fields').pop(eventFn(pd));

    expect(pd).toBeCalled();
  });

  it('should handle unshift', () => {
    const unshift = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayUnshift={unshift}
      />
    ));

    wrapper.prop('fields').unshift();

    expect(unshift).toBeCalledWith('form', 'array');
  });

  it('should prevent default on unshift', () => {
    const pd = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayUnshift={jest.fn()}
      />
    ));

    wrapper.prop('fields').unshift(eventFn(pd));

    expect(pd).toBeCalled();
  });

  it('should not handle shift', () => {
    const shift = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
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
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayShift={shift}
      />
    ));

    wrapper.prop('fields').shift();

    expect(shift).toBeCalledWith('form', 'array');
  });

  it('should prevent default on shift', () => {
    const pd = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _array={1}
        _addArray={jest.fn()}
        _arrayShift={jest.fn()}
      />
    ));

    wrapper.prop('fields').shift(eventFn(pd));

    expect(pd).toBeCalled();
  });

  it('should handle insert', () => {
    const insert = jest.fn();
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
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
        component={Component}
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
        component={Component}
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
        component={Component}
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
        component={Component}
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render a component', () => {
    const wrapper = mount((
      <FieldArray
        name="array"
        component={Component}
        _array={1}
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.find('.Component').length).toBe(1);
  });

  it('should pass custom props', () => {
    const wrapper = shallow((
      <FieldArray
        name="array"
        component={Component}
        doge="wow"
        _array={1}
        _addArray={jest.fn()}
      />
    ));

    expect(wrapper.prop('doge')).toBe('wow');
  });

  it('should fire ref callback on mount', () => {
    const withRef = jest.fn();
    const wrapper = mount((
      <FieldArray
        name="array"
        component={Component}
        withRef={withRef}
        _array={1}
        _addArray={jest.fn()}
      />
    ));

    expect(withRef).toBeCalled();
  });
});


describe('#connect(FieldArray)', () => {
  it('should not mount without context', () => {
    const store = newStore();
    const wrapperFn = () => mount((
      <Provider store={store}>
        <ConnectedFieldArray
          name="test"
          component={MyComp}
        />
      </Provider>
    ));

    expect(wrapperFn).toThrowError(/Form/);
  });

  it('should have a correct name', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
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
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    );

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should remove an array', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    );

    wrapper.unmount();

    expect(getForm(store).arrays).toEqual({});
  });

  it('should push a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').push();

    expect(getForm(store).arrays).toEqual({ test: 1 });
  });

  it('should pop a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').push();
    wrapper.prop('fields').pop();

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should unshift a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').unshift();

    expect(getForm(store).arrays).toEqual({ test: 1 });
  });

  it('should shift a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').unshift();
    wrapper.prop('fields').shift();

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should insert a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').insert(0);

    expect(getForm(store).arrays).toEqual({ test: 1 });
  });

  it('should remove a field', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').insert(0);
    wrapper.prop('fields').remove(0);

    expect(getForm(store).arrays).toEqual({ test: 0 });
  });

  it('should map fields', () => {
    const store = newStore();
    const wrapper = mount((
        <Provider store={store}>
          <ConnectedFieldArray
            name="test"
            component={MyComp}
          />
        </Provider>
      ),
      options,
    ).find(MyComp);

    wrapper.prop('fields').push();
    wrapper.prop('fields').push();

    expect(wrapper.prop('fields').map(R.identity)).toEqual(['test.0', 'test.1']);
  });
});
