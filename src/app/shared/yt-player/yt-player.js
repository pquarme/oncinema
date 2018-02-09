import React, { Component } from "react";
import "./yt-player.css";

const YT = window.YT;

class YTPlayer extends Component {
  componentDidMount() {
    console.log("yt player", this.props);

    const player = new YT.Player("existing-iframe-example", {
      videoId: this.props.video,
      events: {
        onReady: this.onReady,
        onStateChange: this.onStateChange
      }
    });
    this.setState({ player: player });
  }

  onReady(e) {
    // console.log("youtube player ready ", e);
    e.target.playVideo();
  }

  onStateChange(state) {
    // console.log("youtube player state change ", state);
  }

  close = () => {
    this.state.player.stopVideo();
    console.log(this.props);
    this.props.handleClose();
  };

  render() {
    return (
      <div className="video-container" onClick={this.close}>
        <div className="close-icon" onClick={this.close}>
          <svg height="20px" viewBox="0 0 30 30" width="20px">
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g
                fill="#ffffff"
                transform="translate(-1246.000000, -227.000000)"
              >
                <path
                  d="M1246.58,256.415 C1246.97,256.805 1247.49,257.001 1248,257.001 C1248.51,257.001 1249.02,256.805 1249.41,256.415 L1261,244.829 L1272.58,256.415 C1272.97,256.805 1273.49,257.001 1274,257.001 C1274.51,257.001 1275.02,256.805 1275.41,256.415 C1276.19,255.634 1276.19,254.367 1275.41,253.586 L1263.83,242 L1275.41,230.415 C1276.19,229.634 1276.19,228.367 1275.41,227.586 C1274.63,226.805 1273.36,226.805 1272.58,227.586 L1261,239.172 L1249.41,227.586 C1248.63,226.805 1247.36,226.805 1246.58,227.586 C1245.8,228.367 1245.8,229.634 1246.58,230.415 L1258.17,242 L1246.58,253.586 C1245.8,254.367 1245.8,255.634 1246.58,256.415 L1246.58,256.415 Z"
                  id="08"
                />
              </g>
            </g>
          </svg>
        </div>
        <div id="existing-iframe-example" />
      </div>
    );
  }
}

export default YTPlayer;
