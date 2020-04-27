import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, email, password } = this.state;
    Accounts.createUser({ firstName, lastName, email, username: firstName, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }


    const signContainer = {
      paddingBottom: '5rem',
    };

    return (
        <Container style={signContainer}>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Divider horizontal>
               <Header inverted as="h2" textAlign="center">
                 Account Information
               </Header>
              </Divider>
              <Form onSubmit={this.submit}>
                <Segment className='signup-form' stacked>
                  <Form.Group widths='equal'>
                    <Form.Input
                        fluid label='First Name'
                        name='firstName'
                        placeholder='First Name'
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid label='Last Name'
                        name='lastName'
                        placeholder='Last Name'
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input
                      label='Email'
                      icon='user'
                      iconPosition='left'
                      name='email'
                      type='email'
                      placeholder='E-mail address'
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='Password'
                      icon='lock'
                      iconPosition='left'
                      name='password'
                      placeholder='Password'
                      type='password'
                      onChange={this.handleChange}
                  />
                </Segment>
                <div align='center'>
                  <Form.Button secondary className='signup-button' content="SIGN UP"/>
                </div>
              </Form>
              <Message className='signup-message'>
                <div align='center'>
                 <Link to="/signin">Already have an account? Login here</Link>
                </div>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;