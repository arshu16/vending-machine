import React from 'react';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
import MoneyReceiver from './MoneyReceiver';
import { Provider } from "react-redux";

describe('<MoneyReceiver />', () => {
  it('renders 6 buttons', () => {
    const wrapper = mount(<Provider store={mockStore()}>< MoneyReceiver />)</Provider>);
    expect(wrapper.find('button').length).toEqual(6);
  });
});