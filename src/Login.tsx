import React, { Component } from 'react';
import { proxy } from './Proxy';
import { TextInput } from './TextInput';

export class Login extends Component {
    state = { email: "", password: "", displayName: "", register: false };
    onClick() {
        if (this.state.register)
            proxy.sendPacket({
                type: "register", email: this.state.email, password: this.state.password,
                displayName: this.state.displayName, staySignedIn: false
            });
        else
            proxy.sendPacket({
                type: "login", email: this.state.email, password: this.state.password,
                staySignedIn: false
            });
    }
    render() {
        return (
            <div className="login">
                <img src="logo512.png" width="256" />
                <TextInput type="email" placeholder="Email (someone@example.com)" value={this.state.email} onChange={e => {
                    this.setState({ email: e });
                    if ((e === "Z80H3X") && !this.state.register) this.setState({ displayName: "Barnabás" });
                }} onEnter={ () => this.onClick() } autofocus={ true } />
                {this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)" value={this.state.displayName}
                        onChange={e => this.setState({ displayName: e })} onEnter={ () => this.onClick() } />}
                <TextInput type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e })} onEnter={ () => this.onClick() } />
                <button type="button" onClick={() => this.onClick()}>{this.state.register ? "Register" : "Login"}</button>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
                <p>{this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.setState((state: any) => ({ register: !state.register })); // pass a function instead of object
                    }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>
            </div>);
    }
}