type State = {
  text: string;
  movies: Movies;
};

type Movie = {
  title: string;
  id: number;
  releaseYear: string;
};

type Movies = Movie[];

export const state: State = {
  text: 'hey',
  movies: [],
};
