import React from 'react';
import UserCard from "./UserCard";
import ToggleableUserForm from "./ToggleableUserForm";

const UserList = function (props) {

    function handleDelete(item) {
        props.onFormDeleteUser(item)
    }

    function handleEdit(user) {
        props.onFormEditUser(user)
    }

    function newUserInfo(user) {
        props.addUserCard(user)
    }

    const {users} = props;

    return (
        <div className='ui centered link cards'>
            <div className="card">
                <ToggleableUserForm newUserInfo={newUserInfo}/>
            </div>

            {users.map(user => {
                return <UserCard
                    key={user.id}
                    user={user}
                    onDletetClick={handleDelete}
                    onEditClick={handleEdit}
                />

            })}
        </div>
    )

};

export default UserList;