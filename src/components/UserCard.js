import React, {Component} from 'react';
import {Card, Button, Image, Icon, Input} from 'semantic-ui-react'

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
            <Card>

                <Image src={user.avatar_url} wrapped ui={false}/>

                <Card.Content>
                    <Card.Header>
                        {!this.state.editFormOpen ? (
                            user.login
                        ) : (
                            <div className="ui action input">
                                <Input
                                    error={this.state.login === ""}
                                    className="user-card-login"
                                    onChange={this.handleLoginChange}
                                    value={this.state.login}
                                />
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
                    </Card.Header>

                    <Card.Description>
                        <Icon name='github' size='large' color="black"/>
                        <a target='_blank' href={user.html_url} rel="noopener noreferrer">{user.html_url}</a>
                    </Card.Description>

                </Card.Content>

                <Card.Content extra>
                    <a>
                        <Icon name='trash alternate' color="black" onClick={this.onDeleteClick}/>
                    </a>
                    {!this.state.editFormOpen ?
                        (
                            <a>
                                <Icon name='edit' color="black" onClick={this.handleEditClick}/>
                            </a>

                        ) : ""}
                </Card.Content>

            </Card>
        )
    }
}

export default UserCard;












