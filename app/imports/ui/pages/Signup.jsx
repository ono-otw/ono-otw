import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Account Information
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Group widths='equal'>
                    <Form.Input
                        fluid label='First Name'
                        placeholder='First Name'
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid label='Last Name'
                        placeholder='Last Name'
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input
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
                </Segment>
                <Header as="h2" textAlign="center">
                  Payment Information
                </Header>
                <Segment stacked>
                  <Form.Group inline>
                    <label>Payment Option</label>
                    <Form.Radio
                        label='Debit'
                        name="radioGroup"
                        value = 'debit'
                        checked={this.state.value === 'debit'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Credit'
                        name="radioGroup"
                        value = "credit"
                        checked={this.state.value === 'credit'}
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input
                      label="Card Number"
                      icon="credit card"
                      iconPosition="left"
                      name="card number"
                      placeholder="0000-0000-0000"
                      type="text"
                      onChange={this.handleChange}
                  />
                  <Form.Group widths='equal'>
                    <Form.Input
                        fluid label='Expire Date'
                        placeholder='00/00'
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid label='CVC'
                        placeholder='000'
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                </Segment>
                <Form.Button content="Submit"/>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
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
