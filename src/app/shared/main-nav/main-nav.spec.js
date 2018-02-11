import React from 'react';
import { shallow } from 'enzyme';
import MainNav from './main-nav';

describe('MainNav', () => {
	const wrapper = shallow(<MainNav />);

	it('should render 5 "li" items', () => {
			expect(wrapper.find('li')).toHaveLength(5);
	});

	it('should render "NavLink" item', () => {
			expect(wrapper.find('NavLink')).toHaveLength(5);
	});

});
