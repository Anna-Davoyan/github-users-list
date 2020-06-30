import React from 'react';
import UserCard from "./UserCard";
import { Card } from 'semantic-ui-react'
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
        <Card.Group centered>
            <Card>
                <ToggleableUserForm newUserInfo={newUserInfo}/>
            </Card>

            {users.map(user => {
                return <UserCard
                    key={user.id}
                    user={user}
                    onDletetClick={handleDelete}
                    onEditClick={handleEdit}
                />

            })}
        </Card.Group>
    )

};

export default UserList;