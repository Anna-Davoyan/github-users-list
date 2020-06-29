import React, {Component} from 'react';
import {Button, Image,Form} from "semantic-ui-react";
import userImg from '../image.jpg';
import uuid from 'react-uuid';

class AddUserCard extends Component {

    state = {
        login: '',
        html_url: '',
        avatar_url: '',
        errored: false,
        validation: {
            githubError: false,
            avatarError: false,
            loginError: false
        }
    };

    handleLogin = (e) => {
        const validation = this.state.validation;
        validation.loginError = false;
        this.setState({
            login: e.target.value,
            validation: validation
        })
    };
    handleGitHubURL = (e) => {
        const validation = this.state.validation;
        validation.githubError = false;
        this.setState({
            html_url: e.target.value,
            validation: validation
        })
    };
    handleAvatar = (e) => {
        const validation = this.state.validation;
        validation.avatarError = false;
        this.setState({
            avatar_url: e.target.value,
            errored: true,
            validation: validation
        })
    };
    onCancelAddUserCard = () => {
        this.props.onCancelAddUserCard();
    };
    onAddUserCard = () => {
        const validGithub = !this.state.html_url.match("^https?:\\/\\/github.com\\/[a-zA-Z0-9].*");
        const validLogo = !this.state.login;
        const validation = {
            githubError: validGithub,
            avatarError: !this.state.errored,
            loginError: validLogo,
        };
        console.log(validation.avatarError)
        if (!validation.githubError && !validation.avatarError && !validation.loginError) {
            const id = uuid();
            const user = {
                id: id,
                login: this.state.login,
                html_url: this.state.html_url,
                avatar_url: this.state.avatar_url
            };
            this.props.onAddUserCard(user);
            this.props.onCancelAddUserCard();
            this.setState({errored: true, avatar_url: ""})
        } else {
            this.setState({validation: validation})
        }
    };
    onError = () => {
        this.setState({
            errored: false,
        });
    };


    render() {
        const userCard = this.state;
        return (
            <React.Fragment>
                <div className="ui big image">
                    <Image src={!userCard.errored ? userImg : userCard.avatar_url} onError={this.onError}/>
                </div>

                <div className="content">
                    <div className="header ui  input">
                        <Form>
                            <Form.Input
                                className="avatar"
                                error={userCard.validation.avatarError && { content: 'Please enter a valid Image URL', pointing: 'below', size:'mini'}}
                                fluid
                                placeholder='Avatar URL'
                                id='avatar-url'
                                value={userCard.avatar_url === userImg ? "" : userCard.avatar_url}
                                onChange={this.handleAvatar}
                            />
                            <Form.Input
                                className="add-login"
                                error={userCard.validation.loginError && { content: 'Please enter a Login', pointing: 'below',size:'mini' }}
                                fluid
                                placeholder='Login'
                                id='user-login'
                                value={userCard.login}
                                onChange={this.handleLogin}
                            />
                            <Form.Input
                                className="add-github"
                                error={userCard.validation.githubError && { content: 'Please enter a valid GitHub URL', pointing: 'below',size:'mini' }}
                                fluid
                                placeholder='GitHub URl'
                                id='user-github'
                                value={userCard.html_url}
                                onChange={this.handleGitHubURL}
                            />


                        </Form>
                    </div>

                </div>
                <div className="extra content">
                    <Button.Group>

                        <Button onClick={this.onCancelAddUserCard}>Cancel</Button>
                        <Button.Or/>
                        <Button onClick={this.onAddUserCard} primary>Save</Button>
                    </Button.Group>
                </div>
            </React.Fragment>
        )
    }
}

export default AddUserCard;



