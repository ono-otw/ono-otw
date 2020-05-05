import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword({username: email}, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    const paddingDiv = {
      paddingTop: '2rem',
      paddingRight: '3rem',
      paddingLeft: '3rem',
      paddingBottom: '2rem',
    };

    const signContainer = {
      paddingBottom: '5rem',
    };

    // Otherwise return the Login form.
    return (
        <div>
        <Container style={signContainer}>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Divider horizontal>
                <Header inverted as="h2" textAlign="center">
                  Login
                </Header>
              </Divider>
              <Form onSubmit={this.submit}>
                <Segment className='signin-form' stacked>
                  <div align='center' style={paddingDiv}>
                    <Form.Input className='signin-input'
                        label="Email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div align='center'>
                    <Form.Button secondary className='signin-button' content="LOGIN"/>
                  </div>
                </Segment>
              </Form>
              <Message className='signin-message'>
                <div align='center'>
                  <Link to="/signup">New user? Sign up here!</Link>
                </div>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Login was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
