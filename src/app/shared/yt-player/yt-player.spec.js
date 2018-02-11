import React from 'react';
import { shallow } from 'enzyme';
import YTPlayer from './yt-player';

//mock youtube player
const event = { target: { playVideo: jest.fn(), stopVideo: jest.fn() } };
window.YT = {
  Player: jest.fn((id, options) => {
    options.events.onReady(event);
    return { stopVideo: event.target.stopVideo };
  })
};

describe('YTPlayer', () => {
  const handleClose = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<YTPlayer handleClose={handleClose} />);
  });

  it('create youtube player', () => {
    expect(window.YT.Player).toBeCalled();
  });

  it('should autoplay video', () => {
    expect(event.target.playVideo).toBeCalled();
  });

  it('should contain close icon', () => {
    expect(wrapper.find('.close-icon')).toHaveLength(1);
  });

  describe('user clicks on close icon', () => {
    beforeEach(() => {
      const closeIcon = wrapper.find('.close-icon').first();
      closeIcon.simulate('click');
    });

    it('should call youtubePlayer stopVideo()', () => {
      expect(event.target.stopVideo).toBeCalled();
    });

    it('should call prop handleClose()', () => {
      expect(handleClose).toBeCalled();
    });
  });
});
