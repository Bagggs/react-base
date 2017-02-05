import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { closeModal } from 'actions/application';
import { setValue, createUser } from 'actions/signup';

class SignupModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      passwordConfirmation: PropTypes.string
    })
  }

  setValue = ({ target }) => {
    const { dispatch } = this.props;

    dispatch(setValue(target.name, target.value));
  }

  signUp = (event) => {
    const { dispatch, user } = this.props;
    event.preventDefault();

    if (this.isValid()) {
      dispatch(createUser(user));
      dispatch(closeModal());
    }
  }

  isValid() {
    const user = this.props.user;

    return (
      user.name.trim().length &&
      user.email.length >= 6 &&
      user.password.length >= 6 &&
      user.passwordConfirmation.length >= 6 &&
      this.isValidPassword()
    );
  }

  isValidPassword() {
    return this.props.user.password === this.props.user.passwordConfirmation;
  }

  validationState(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  nameValidationState(value) {
    return value.trim().length ? 'success' : 'error';
  }

  passwordValidationState(value) {
    return (this.isValidPassword() && value.length >= 6) ? 'success' : 'error';
  }

  hideModal = () => {
    const { dispatch } = this.props;

    dispatch(closeModal());
  }

  render() {
    return (
      <Modal
        bsSize="small"
        show={ this.props.isModalOpen }
        onHide={ this.hideModal }
      >
        <Modal.Header closeButton>
          <h3 className="modal-title">Sign Up</h3>
        </Modal.Header>

        <form onSubmit={ this.signUp }>
          <Modal.Body>
            <FormGroup
              controlId="name"
              validationState={ this.nameValidationState(this.props.user.name) }
            >
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="email"
              validationState={ this.validationState(this.props.user.email) }
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                name="email"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={ this.validationState(this.props.user.password) }
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="passwordConfirmation"
              validationState={ this.passwordValidationState(this.props.user.passwordConfirmation) }
            >
              <ControlLabel>Password Confirmation</ControlLabel>
              <FormControl
                type="password"
                name="passwordConfirmation"
                onChange={ this.setValue }
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              type="submit"
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  ...state.application,
  ...state.signup
});

export default connect(mapStateToProps)(SignupModal);
