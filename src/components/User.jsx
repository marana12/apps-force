import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../styles/user.scss';

User.propTypes = {
    name: PropTypes.shape({
        title: PropTypes.string,
        first: PropTypes.string,
        last: PropTypes.string
    }),
    email: PropTypes.string.isRequired,
    picture: PropTypes.shape({
        medium: PropTypes.string
    }).isRequired,
    login: PropTypes.shape({
        uuid: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({
        city: PropTypes.string,
        country: PropTypes.string,
        street: PropTypes.shape({
            name: PropTypes.string,
            number: PropTypes.number
        })
    }).isRequired,
    onOpenModal: PropTypes.func.isRequired,
    userRef: PropTypes.object.isRequired
}
export default function User({
    name, 
    email, 
    picture, 
    login, 
    location,
    onOpenModal,
    userRef}){

    const [fullName, setFullName] = useState();
    const [address, setAddress] = useState();
    const [emailAddress, setEmailAddress] = useState();

    useEffect(() => {
        const { street } = location;

        setFullName(`${name.first} ${name.last}`);

        setAddress(`${street.name} ${street.number}, ${location.city}`);

        setEmailAddress(email)
    },[location, name, email]);

    const openModalHandler = () => {
        const modalProps = {
            name,
            email: emailAddress,
            location,
            uid: login.uuid
        }
    
        userRef.current = {
            modalProps
        };

        onOpenModal();
    };

    return (
        <>
            <div className='user'>
                <div className='user__image'>
                    <img src={picture.medium} alt={fullName} />
                </div>

                <div className="user__info">
                    <div className="user__info-name">
                        {fullName}
                    </div>

                    <div className='user__info-conact'>
                        {emailAddress}
                    </div>

                    <div className='user__info-location'>
                        {address}

                        <span className='location__country'>
                            {location.country}
                        </span>
                    </div>
                </div>

                <div className="user__footer">
                    <button 
                        type='button' 
                        className='footer__edit-btn'
                        onClick={openModalHandler}
                        >Edit User</button>
                </div>
            </div>
        </>
    )
}