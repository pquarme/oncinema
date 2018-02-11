import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from './movie-card';

describe('MovieCard', () => {
  const movie = {
    id: 406997,
    title: 'Wonder',
    description: 'The story of August Pullman.',
    genre: 'drama',
    media: {
      backdrop: '/4rsrxYDfIzvtAsIE9wevxPRXAk4.jpg',
      poster: '/ouYgAatYH4JzIThj6FI3UYf31RI.jpg',
      video: 'ZDPEKXx_lAI'
    }
  };
  const handlePlay = jest.fn();
  const handleSelectMovie = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MovieCard
        movie={movie}
        handlePlay={handlePlay}
        handleSelectMovie={handleSelectMovie}
      />
    );
  });

  it('should render movie title', () => {
    expect(wrapper.find('.movie-title').text()).toEqual(movie.title);
  });

  it('should render play icon', () => {
    expect(wrapper.find('.play')).toHaveLength(1);
  });

  describe('user clicks on play icon', () => {
    beforeEach(() => {
      const playIcon = wrapper.find('.play').first();
      playIcon.simulate('click');
    });

    it('should call handlePlay() prop', () => {
      expect(handlePlay).toBeCalled();
    });
  });

	describe('user clicks on title', () => {
    beforeEach(() => {
      const title = wrapper.find('.movie-title').first();
      title.simulate('click');
    });

    it('should call handleSelectMovie() prop', () => {
      expect(handleSelectMovie).toBeCalled();
    });
  });
});
