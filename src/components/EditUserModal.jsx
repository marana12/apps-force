import { useState, useEffect } from 'react';
import '../styles/edit-user-modal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { validateUserFields, UPDATE_USER_EVENT_KEY } from '../helpers/usersHelpers';
import InputWithErrorMessage from './InputWithErrorMessage';
import { publish } from '../helpers/CustomEvent';

EditUserModal.propTypes = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.shape({
    title: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string
    }).isRequired,  
  email: PropTypes.string.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    street: PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.number
    })
}).isRequired,
showModal: PropTypes.bool.isRequired,
oncloseModal: PropTypes.func.isRequired
}
export default function EditUserModal({uid, name, email, location, showModal, oncloseModal}) {
  const [show, setShow] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm({
    criteriaMode: "all"
  });

    const onSubmit = data => {
      if(!data){
        return;
      }

      const fullData = {
        uid,
        ...data
      }

      publish(UPDATE_USER_EVENT_KEY, fullData);

      oncloseModal();
    };

  useEffect(() => {

    setShow(showModal);
  },[showModal])

  const handleClose = () => {
    oncloseModal();
  };

  const { street } = location;

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${name.title} ${name.first} ${name.last}`}</Modal.Title>
        </Modal.Header>

          <Form className='edit-user-modal' onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div className="edit-user-modal__info-fields mb-3">
                <Form.Group className="col-12">

                  <Form.Label>First Name</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"text",
                      placeholder:"Enter first name",
                      defaultValue: name.first,
                      ...register("fname", validateUserFields.name)
                      }
                    }
                    errors={errors}/>
                </Form.Group>

                <Form.Group className="col-12">

                  <Form.Label>Last Name</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"text",
                      placeholder:"Enter last name",
                      defaultValue: name.last,
                      ...register("lname", validateUserFields.lname)
                      }
                    }
                    errors={errors}/>
                </Form.Group>

                <Form.Group className="mb-3 col-12">

                  <Form.Label>Email address</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"email", 
                      placeholder:"Enter email",
                      defaultValue:email,
                      ...register("email", validateUserFields.email)
                      }
                    }
                    errors={errors}/>

                </Form.Group>
              </div>

              <div className="edit-user-modal__location-fields mb-3">
                <Form.Group className='col-12'>
                  <Form.Label>Address</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"text", 
                      placeholder:"Enter your address",
                      defaultValue: street.name,
                      ...register("address", validateUserFields.address)
                      }
                    }
                    errors={errors}/>
                </Form.Group>

                <Form.Group className='col-12'>
                  <Form.Label>Street number</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"text", 
                      placeholder:"Enter your street number",
                      defaultValue: street.number,
                      ...register("streetNumber", validateUserFields.streetNumber)
                      }
                    }
                    errors={errors}/>
                </Form.Group>

                <Form.Group className='col-12'>
                  <Form.Label>City</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"text",
                      placeholder:"Enter the City",
                      defaultValue: location.city,
                      ...register("city", validateUserFields.city)
                      }
                    }
                    errors={errors}/>
                </Form.Group>

                <Form.Group className='col-12'>
                  <Form.Label>Country</Form.Label>

                  <InputWithErrorMessage
                    inputProps={{
                      className:"form-control",
                      type:"text",
                      placeholder:"Enter the Country",
                      defaultValue: location.country,
                      ...register("country", validateUserFields.country)
                      }
                    }
                    errors={errors}/>
                </Form.Group>
              </div>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>

      </Modal>
  );
}
