import React from "react";
import Posts from "../post/Posts";

const Home = () => (
    <div>
        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome to React Frontend</p>
            {console.log("This is your env variable", process.env.REACT_APP_API_URL)}
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
);

export default Home;
