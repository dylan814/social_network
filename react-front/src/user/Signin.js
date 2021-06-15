import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";
import ReCAPTCHA from "react-google-recaptcha";
 

 


class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };


    onChange(value) {
        console.log("Captcha value:", value);
      }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });
    };

    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
            
            <p>
            <button className=" mt-5 btn btn-raised btn-danger">

            <Link to="/forgot-password" style={{color:"white"}}>
              
              Forgot Password
              </Link>  
            </button>
            </p>     
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
              
              
 
                <hr />
                <SocialLogin />
                <hr />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.signinForm(email, password)}
                <ReCAPTCHA sitekey="6LcKZNIZAAAAAICxZVVzbQ5dlWb4OArZqP2Eb3Ho" onChange={this.onChange} />
            </div>
        );
    }
}

export default Signin;
