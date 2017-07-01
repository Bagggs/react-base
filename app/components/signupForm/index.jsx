import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { translate } from 'react-i18next';
import Form from 'components/form';

class SignupForm extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    signupUser: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {}
  }

  setValue = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  isFormValid = () => {
    const { name, email, password, passwordConfirmation } = this.state;

    return (
      name.trim().length &&
      email.length > 5 &&
      password.length > 5 &&
      passwordConfirmation.length > 5 &&
      this.isValidPassword()
    );
  }

  isValidPassword = () => {
    const { password, passwordConfirmation } = this.state;

    return password === passwordConfirmation;
  }

  validationState = value => {
    const length = value.length;

    if (!length) return null;

    return length > 5 ? 'success' : 'error';
  }

  nameValidationState = value => {
    const length = value.trim().length;

    if (!length) return null;

    return length ? 'success' : 'error';
  }

  passwordValidationState = value => {
    const length = value.length;

    if (!length) return null;

    return (this.isValidPassword() && length > 5) ? 'success' : 'error';
  }

  signUp = event => {
    event.preventDefault();

    const { name, email, password, passwordConfirmation } = this.state;
    const { signupUser, closeModal } = this.props;

    if (this.isFormValid()) {
      signupUser({ name, email, password, passwordConfirmation })
        .then(() => {
          this.setState({
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          });
          closeModal();
        })
        .catch(({ errors }) => this.setState({ errors }));
    }
  }

  render() {
    const {
      name,
      email,
      password,
      passwordConfirmation
    } = this.state;
    const { isLoading, t } = this.props;

    return (
      <Form onSubmit={ this.signUp }>
        <Modal.Body>
          <FormGroup
            controlId="name"
            validationState={ this.nameValidationState(name) }
          >
            <ControlLabel>{ t('session:name') }</ControlLabel>
            <FormControl
              type="text"
              name="name"
              onChange={ this.setValue }
            />
          </FormGroup>
          <FormGroup
            controlId="email"
            validationState={ this.validationState(email) }
          >
            <ControlLabel>{ t('session:email') }</ControlLabel>
            <FormControl
              type="text"
              name="email"
              onChange={ this.setValue }
            />
          </FormGroup>
          <FormGroup
            controlId="password"
            validationState={ this.validationState(password) }
          >
            <ControlLabel>{ t('session:password') }</ControlLabel>
            <FormControl
              type="password"
              name="password"
              onChange={ this.setValue }
            />
          </FormGroup>
          <FormGroup
            controlId="passwordConfirmation"
            validationState={ this.passwordValidationState(passwordConfirmation) }
          >
            <ControlLabel>{ t('session:passwordConfirmation') }</ControlLabel>
            <FormControl
              type="password"
              name="passwordConfirmation"
              onChange={ this.setValue }
            />
          </FormGroup>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              type="submit"
              disabled={ isLoading }
            >
              { t('session:submit') }
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    );
  }
}

export default translate()(SignupForm);
