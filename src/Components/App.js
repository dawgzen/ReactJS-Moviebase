import React, {Component} from 'react';
import Nav from './Nav'
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import MovieInfo from "./MovieInfo";

/*
Constructor of my App
*/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            searchQuery: '',
            totalResults: 0,
            currentPage: 1,
            currentMovie: null,
        };

        /*
        The code below Would keep my API-key safe, but doesnt seem to work at the moment
        */

        // this.apiKey = process.env.REACT_APP_API;
        this.apiKey = "ecc96e5be9242465b948426f862a7507";
    }


    viewMovieInfo = (id) => {
        const filteredMovie = this.state.movies.filter(movie => movie.id === id);

        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;

        this.setState({currentMovie: newCurrentMovie})
    };

    closeMovieInfo = () => {
        this.setState({currentMovie: null})
    };

    //handleSubmit Fetches data from the API and stores it as Json format also keeps track of the results found.
    handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchQuery}`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({movies: [...data.results], totalResults: data.totalResults});
                console.log(data.totalResults)

            })
    };


    //handleChange Changes the searchQuery's value after each change
    handleChange = (e) => {
        this.setState({searchQuery: e.target.value})
    };

    nextPage = (pageNumber) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchQuery}&page=${pageNumber}`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({movies: [...data.results], currentPage: pageNumber})
            })
    };


    //Renders my App
    render() {
        const numberPages = Math.floor(this.state.totalResults / 20);

        return (
            <div className="App">
                <Nav/>
                {this.state.currentMovie === null ?
                    <div><SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                        <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> :
                    <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>}

                {this.state.totalResults > 20 && this.state.currentMovie === null ?
                    <Pagination pages={numberPages} nextPage={this.nextPage}
                                currentPage={this.state.currentPage}/> : ""}

            </div>
        );
    }
}

export default App;
