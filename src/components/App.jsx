import '../styles/app.scss';
import { getRandomUsers } from '../services/users';
import { getFromStorage, saveOnStorage, changeUserDetails } from '../helpers/usersHelpers';
import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from '../helpers/CustomEvent';
import { UPDATE_USER_EVENT_KEY } from '../helpers/usersHelpers';

import Users from './Users';
import { useCallback } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const resp = await getRandomUsers();
      
      return resp;
    }

    const users = getFromStorage();

    if(users){
      setUsers(users);

      return;
    }

    getUsers()
    .then(resp => {
      setUsers(resp);

      saveOnStorage(resp);
    })
    .catch(err => console.error(err));
    
  },[setUsers]);


  subscribe(UPDATE_USER_EVENT_KEY, data => {
    const { detail } = data;

    changedUser(detail)
});

  const changedUser = useCallback((detail) => {   
    const changedUsers = changeUserDetails(detail);

    if(!changedUsers){
      return null;
    }

    setUsers(changedUsers);

    unsubscribe(UPDATE_USER_EVENT_KEY);

  },[]);

  return (
    <div className='App'>
      <Users users={users}/>
    </div>
  );
}

export default App;
