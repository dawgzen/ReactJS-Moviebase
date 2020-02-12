import React from "react";

        /*
       Searchbar Component
       */
const SearchBar = (props) => {
    return (
        <div className="container">
            <div className="row">
                <section className="col s8 offset-s2">
                    <form action="" onSubmit={props.handleSubmit}>
                        <div className="input-field">
                            <input placeholder="Search Movie's" type="text" onChange={props.handleChange}/>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
};

export default SearchBar;