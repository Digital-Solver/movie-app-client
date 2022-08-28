/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: { $oid: '62e938287c0a0ae6aed15c15' }, Title: 'Blade Runner', Description: "Blade Runner is a 1982 science fiction film directed by Ridley Scott, and adapted by Hampton Fancher and David Peoples.[7][8] Starring Harrison Ford, Rutger Hauer, Sean Young, and Edward James Olmos, it is an adaptation of Philip K. Dick's 1968 novel Do Androids Dream of Electric Sheep?", Director: { Name: 'Ridley Scott', Bio: 'Sir Ridley Scott (born 30 November 1937) is an English film director and producer. He has directed, among others, the science fiction films Alien (1979), Blade Runner (1982) and The Martian (2015), the road crime film Thelma & Louise (1991), the historical epic drama film Gladiator (2000).', Birth: '1937-11-30' }, Genre: { Name: 'Science Fiction', Description: 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity.' }, ImageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Blade_Runner_%281982_poster%29.png/220px-Blade_Runner_%281982_poster%29.png', Featured: true },
        { _id: { $oid: '62e938287c0a0ae6aed15c16' }, Title: 'Inception', Description: "Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious.", Director: { Name: 'Christopher Nolan', Bio: 'A British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide and have garnered 11 Academy Awards from 36 nominations.', Birth: '1970-07-30' }, Genre: { Name: 'Science Fiction', Description: 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity.' }, ImageURL: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg', Featured: false },
        { _id: { $oid: '62e938287c0a0ae6aed15c17' }, Title: 'Shutter Island', Description: "Shutter Island is a 2010 American neo-noir psychological thriller film[4] directed by Martin Scorsese and adapted by Laeta Kalogridis, based on the 2003 novel of the same name by Dennis Lehane. Leonardo DiCaprio stars as Deputy U.S. Marshal Edward \"Teddy\" Daniels, who is investigating a psychiatric facility on Shutter Island after one of the patients goes missing. Mark Ruffalo plays his partner and fellow deputy marshal, Ben Kingsley is the facility's lead psychiatrist, Max von Sydow is a German doctor, and Michelle Williams is Daniels' wife. Released on February 19, 2010, the film received mostly positive reviews from critics, was chosen by National Board of Review as one of the top ten films of 2010, and grossed over $294 million worldwide.", Director: { Name: 'Martin Scorcese', Bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter and actor. He is the recipient of many accolades, including an Academy Award, three Primetime Emmy Awards, a Grammy Award, four British Academy Film Awards, three Golden Globe Awards, and two Directors Guild of America Awards.', Birth: '1942-11-17' }, Genre: { Name: 'Thriller', Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.' }, ImageURL: 'https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg', Featured: false },

      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie

          ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
            />
          )

          : movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieData={movie}
              onMovieClick={(movie) => { this.setSelectedMovie(movie); }}
            />
          ))}
      </div>
    );
  }
}

export default MainView;
