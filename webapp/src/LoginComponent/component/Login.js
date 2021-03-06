import React, {Component} from "react";
import axios from "axios";
import "../css/LoginComponent.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import img from "../images/background.jpg"

import {LoginNav} from "./LoginNav";

const LoginDiv = {
    marginTop: "90px",
    backgroundColor: "rgba(0,0,0,0)"
};

const bgGround = {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundImage: 'url(' + img + ')'
};

export class Login extends Component {
    state = {
        userInfo: [
            {
                "username": "Howell",
                "password": "Howell123"
            }, {
                "username": "Cindy",
                "password": "Cindy123"
            }
        ],

        user: {},

        username: "",

        password: ""
    };

    componentDidMount() {
        
        axios.get(`${process.env.REACT_APP_API_URL}/users`)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                   userInfo: resp.data
                });
            });
    }

    clickLogin(username, password) {
        console.log(username, password);

        let flag = 0;

        for (let i = 0; i < this.state.userInfo.length; i++) {
            if (this.state.userInfo[i].username === username) {
                if (this.state.userInfo[i].password === password) {
                    this.props.history.push(`/index/${username}`);
                } else {
                    console.log("Error Password");
                }
            } else
                flag++;
        }

        if (flag === this.state.userInfo.length)
            console.log("No Such Username");
        else
            console.log("Login Successfully");

        axios.get(`${process.env.REACT_APP_API_URL}/api/users/${username}`)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    user: resp.data[0]
                });
                console.log(this.state.user);
            });

    }



    formUserName(e) {
        this.setState({
            username: e.target.value
        });
    }

    formPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        // const logins = this.state.userInfo.map((userInfo, i) =>
        //     <li key={i}>
        //         <b>{userInfo.username}</b>: {userInfo.password}
        //     </li>
        // );
        return (
            <div style={bgGround}>
                <LoginNav/>
                <div className="auth-wrapper" >
                    <div className="auth-inner" style={LoginDiv}>
                        <form>
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Enter username" onChange={(e) => this.formUserName(e)} value={this.state.username}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.formPassword(e)} value={this.state.password}/>
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.clickLogin(this.state.username, this.state.password)}>Sign In</button>
                        </form>
                    </div>
                </div>

            </div>

        );

    }
}