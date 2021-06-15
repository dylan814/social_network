// 670250990386-i1fnnartssmjbnaqu40iroje5n2la32d.apps.googleusercontent.com
// 2685737534977457 is a facebook ID

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login'; 
import { socialLogin, authenticate } from "../auth";
 
class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    responseFacebook = (response) => {
        console.log(response);
        const {name, email, id, picture } = response;
        const user = {
            password: id,
            name: name,
            email: email,
            imageUrl: picture,
        };
    
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
        
      }
      
 
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        // console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };
 
    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
 
        return (
            <div>
            <GoogleLogin className="mr-5"
                clientId="670250990386-i1fnnartssmjbnaqu40iroje5n2la32d.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />

            <FacebookLogin 
            appId="2685737534977457"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.responseFacebook}
            callback={this.responseFacebook}
             />
         
            </div>
        );
    }
}
 
export default SocialLogin;