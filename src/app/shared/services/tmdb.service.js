const fetch = require("isomorphic-fetch");

class TMDBService {
  getGenre(genre) {
    return fetch(`api/discover/${genre}`).then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    });
  }
}

export default TMDBService;
