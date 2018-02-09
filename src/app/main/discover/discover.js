import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { MovieCard, YTPlayer } from "../../shared/shared.module";
import "./discover.css";

const _debounce = require("lodash.debounce");

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} exit={false} timeout={1000} classNames="slide">
    {children}
  </CSSTransition>
);

class Discover extends Component {
  constructor({ match }) {
    super();

    this.state = {
      movies: [],
      isLoading: true,
      selectedMovie: {},
      genre: match.params.genre,
      playVideo: false
    };

    this.debounceRequest = _debounce(this.loadGenre, 500);
  }

  componentDidMount() {
    this.loadGenre(this.state.genre);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const genre = nextProps.match.params.genre;
      this.setState({ isLoading: true });
      this.debounceRequest(genre);
    }
  }

  loadGenre = genre => {
    this.setState({
      playVideo: false,
      genre: genre,
      isLoading: true
    });

    fetch(`api/discover/${genre}`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(movies => {
        this.setState(prevState => ({
          isLoading: false,
          selectedMovie: movies[0],
          movies: []
        }));

        //mimic step animation
        movies.forEach((movie, index) => {
          window.setTimeout(
            movie => {
              this.setState(prevState => ({
                movies: [...prevState.movies, movie]
              }));
            },
            100 * index,
            movie
          );
        });
      })
      .catch(err => this.props.history.push("/action"));
  };

  handlePlayMovie = movie => {
    this.handleSelectMovie(movie);
    this.setState({ playVideo: true });
  };

  handleSelectMovie = movie => {
    this.setState({ selectedMovie: movie });
  };

  handleClosePlayer = () => {
    this.setState({ playVideo: false });
  };

  render() {
    const ytPlayer = this.state.playVideo ? (
      <YTPlayer
        key={this.state.selectedMovie.media.video}
        video={this.state.selectedMovie.media.video}
        handleClose={this.handleClosePlayer}
      />
    ) : null;

    let moviesContainer = (
      <div className="row">
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder" />
      </div>
    );

    let descriptionContainer = (
      <div>
        <div className="placeholder" />
        <div className="placeholder" />
      </div>
    );

    if (!this.state.isLoading) {
      const movieList = this.state.movies.map(movie => (
        <Fade key={movie.id}>
          <MovieCard
            movie={movie}
            isSelected={movie.id === this.state.selectedMovie.id}
            genre={this.state.genre}
            handleSelectMovie={this.handleSelectMovie}
            handlePlay={this.handlePlayMovie}
          />
        </Fade>
      ));

      moviesContainer = (
        <TransitionGroup className="row">{movieList}</TransitionGroup>
      );

      descriptionContainer = (
        <p className="description">{this.state.selectedMovie.description}</p>
      );
    }

    return (
      <div>
        <div className="movies-container">{moviesContainer}</div>
        <div className="description-containter">
          <h4>Description</h4>
          {descriptionContainer}
        </div>
        <div>{ytPlayer}</div>
      </div>
    );
  }
}

export default Discover;
