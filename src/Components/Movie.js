import React from "react";
        /*
       This Component is used to create my cards of found movies
       */
const Movie = (props) => {
    return (
        <div className="col s12 m6 l3">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    {
                        props.image == null ?
                            <img src={`https://i1.wp.com/frenky.id/wp-content/uploads/2018/02/doge-icon.png?ssl=1`}
                                 alt="card image" style={{width: "100%", height: 360}}/> :
                            <img src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="card image"
                                 style={{width: "100%", height: 360}}/>
                    }
                </div>
                <div className="card-content">
                    <p><a href="#" onClick={() => props.viewMovieInfo(props.movieId)}>View Movie Details</a></p>
                </div>
            </div>
        </div>
    )
};
export default Movie;