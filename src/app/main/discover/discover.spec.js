import React from 'react';
import { shallow } from 'enzyme';
import Discover from './discover';

// TODO: Finish unit tests
//mock tmdb service
import  TMDBService  from '../../shared/services/tmdb.service';
jest.mock('../../shared/services/tmdb.service');
const getGenre = jest.fn((genre) => {
	return {
		then: jest.fn(() => {
			return {catch: jest.fn()}
		})
	}
});
TMDBService.mockImplementation(() => {
	return {
		getGenre: getGenre
	}
})

const movie = {
  id: 406997,
  title: "Wonder",
  description: "The story of August Pullman.",
  genre: "drama",
  media: {
    backdrop: "/4rsrxYDfIzvtAsIE9wevxPRXAk4.jpg",
    poster: "/ouYgAatYH4JzIThj6FI3UYf31RI.jpg",
    video: "ZDPEKXx_lAI"
  }
};

describe('Discover', () => {
  let wrapper;
  const match = {
    params: { genre: 'action' }
  };

  beforeEach(() => {
    wrapper = shallow(<Discover match={match} />);
  });

  it('should update state with genre', () => {
    console.log(wrapper);
    expect(wrapper.state().genre).toEqual('action');
  });

});
