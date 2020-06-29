import React, {Component} from 'react';
import UserList from "./UserList";
import {Button} from "semantic-ui-react";
import './userCard.css'


class UserDashboard extends Component {
    state = {
        users: [],
        link: 'https://api.github.com/users'
    };

    componentDidMount() {
        this.loadData() 
    }

    loadData = () => {
        fetch(this.state.link)
            .then(response => {
                const regExp = '<(.*)>; rel="next"';
                const link = response.headers.get('link');
                const nextLink = link.match(regExp)[1];

                return response.json().then(data => {
                    return {data, nextLink};
                }).then(({data, nextLink}) => {
                    this.setState({users: [...this.state.users, ...data], link: nextLink})
                });

            }).catch(error => console.error(error));
    };

    handleDeleteFromForm = (item) => {
        this.setState({
            users:
                this.state.users.filter(user => user.id !== item.id)
        })
    };
    handleNewUserCard = (user) => {
        this.state.users.unshift(user);
        this.setState({
            users: this.state.users
        });


    };

    handleEditFromForm = (attrs) => {
        this.setState({
            users: this.state.users.map((user) => {
                if (user.id === attrs.id) {
                    return Object.assign({}, user, {
                        login: attrs.login,
                    });
                } else {
                    return user;
                }
            }),
        })
    };

    handleLoadMoreButtonClick = () => {
        this.loadData();
    };

    render() {
        return (
            <div className='user-list'>
                <UserList
                    users={this.state.users}
                    onFormDeleteUser={this.handleDeleteFromForm}
                    onFormEditUser={this.handleEditFromForm}
                    addUserCard={this.handleNewUserCard}
                />
                <div className='learn-more'>
                    <Button primary onClick={this.handleLoadMoreButtonClick}> Load More </Button>
                </div>
            </div>
        )
    }
}

export default UserDashboard;