import PropTypes from 'prop-types';
import '../styles/users.scss'
import User from '../components/User';
import { useState, useCallback, useRef } from 'react';
import EditUserModal from './EditUserModal';

Users.propTypes = {
    users: PropTypes.array.isRequired
}
export default function Users({users}){
    const [showModal, setShowModal] = useState(false);
    const userRef = useRef(null);

    const openModalHandler = useCallback(() => {
            setShowModal(true);
        },[]);

    const closeModalHandler = useCallback(() => {
        setShowModal(false);
    },[]);

    const modalProps = userRef?.current?.modalProps;

    const modalElement = showModal && modalProps
        ? <EditUserModal 
            showModal={showModal}
            uid={modalProps.uid}
            name={modalProps.name}
            location={modalProps.location}
            email={modalProps.email}
            oncloseModal={closeModalHandler}
            />
        : null;

    return (
        <div className='users'>
           {
                users?.map((user, index) => 
                        <User 
                            key={index}
                            email={user.email}
                            location={user.location}
                            name={user.name}
                            picture={user.picture}
                            login={user.login}
                            onOpenModal={openModalHandler}
                            userRef={userRef} 
                            />
                    )
           } 
           
            { modalElement }

        </div>
    )
}