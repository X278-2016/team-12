import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Home from '../src/components/Home/Home';

describe('<Home />', () => {
  it('should display a title', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should have an input box and submit button', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('button')).to.have.length(1);
  });
});
