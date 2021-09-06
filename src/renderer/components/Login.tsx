/* eslint-disable react/no-unused-state */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

interface State {
  username: string;
  password: string;
  rememberMe: boolean;
}

class Login extends React.Component<any, State> {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLTextAreaElement;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  }

  handleCheckBoxChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.checked;
    const { name } = target;
    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  }

  handleLogin() {
    // database stuff (not implemented yet)
    // atm we're just letting anyone login
    const { history } = this.props;
    // const { username, password, rememberMe } = this.state;
    history.push({
      pathname: '/',
      search: '',
      state: { authSuccess: true },
    });
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="card-header">
            <h1>L o g i n</h1>
            <h2>Server dashboard</h2>
          </div>
          <div className="card-body">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={this.handleInputChange}
            />

            <div className="settings-banner">
              <div className="autologin">
                <label htmlFor="rememberme" className="remember-me">
                  <input
                    type="checkbox"
                    id="autologin"
                    name="rememberMe"
                    style={{ marginTop: '0px' }}
                    onChange={this.handleCheckBoxChange}
                  />
                  <span>Remember me</span>
                </label>
              </div>
              <a href="htpps://example.com" className="password-retrieval">
                Forgot password
              </a>
            </div>

            <div className="login-submit">
              <button
                type="button"
                className="btn-standard b-secondary b-shadow"
              >
                Sign up
              </button>
              <button
                type="submit"
                className="btn-standard b-primary b-shadow"
                style={{ float: 'right' }}
                onClick={this.handleLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
