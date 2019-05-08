import React from 'react';
import Machine from './Machine';
import Innards from '../Innards/Innards';

describe('<Machine />', () => {
  it('renders Innards', () => {
    const wrapper = shallow(< Machine/>);
    expect(wrapper.find(Innards)).toHaveLength(1);
  });
});