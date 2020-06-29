import React, {Component} from 'react';
import {Button, Image, Icon, Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class UserCard extends Component {
    state = {
        login: this.props.user.login,
        editFormOpen: false,
        user: null
    };

    componentDidMount() {
        this.setState({user: this.props.user})
    }

    onDeleteClick = () => {
        this.props.onDletetClick(this.props.user);
    };

    handleEditClick = () => {
        this.setState({editFormOpen: true})
    };

    handleLoginChange = (event) => {
        this.setState({login: event.target.value})
    };

    handleSaveClick = () => {
        if (this.state.login !== "") {
            const user = {...this.props.user, login: this.state.login}
            this.props.onEditClick(user);
            this.setState({editFormOpen: false})
        } else {
            this.setState({});
        }
    };

    handleCancelClick = () => {

        this.setState({editFormOpen: false, login: this.props.user.login})
    };

    render() {
        const {user} = this.props;
        if (!user) {
            return null;
        }
        return (
            <div className="card">
                <div className="image">
                    <Image src={user.avatar_url}/>
                </div>

                <div className="content">
                    <div className="header">
                        {!this.state.editFormOpen ? (
                            user.login
                        ) : (
                            <div className="ui action input">
                                <Input error={this.state.login === ""}
                                       className="user-card-login"
                                       onChange={this.handleLoginChange}
                                       value={this.state.login}/>
                                <Button
                                    icon
                                    disabled={this.state.login === ""}
                                    primary
                                    onClick={this.handleSaveClick}>
                                    <Icon name="save"/>
                                </Button>

                                <Button
                                    icon
                                    className="user-card-cancel"
                                    primary
                                    onClick={this.handleCancelClick}>
                                    <Icon name="cancel"/>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="description">
                        <Icon name='github' size='large' color="black"/>
                        <a target='_blank' href={user.html_url} rel="noopener noreferrer">{user.html_url}</a>
                    </div>
                </div>
                <div className="extra content">
                    <Icon name='trash alternate' color="black" onClick={this.onDeleteClick}/>
                    {!this.state.editFormOpen ?
                        (<Icon name='edit' color="black" onClick={this.handleEditClick}/>
                        ) : ""}
                </div>
            </div>
        )

    }

}

export default UserCard;












