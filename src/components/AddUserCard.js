import React, {Component} from 'react';
import {Button, Image, Input, Card} from "semantic-ui-react";
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
            <>
                <Image src={!userCard.errored ? userImg : userCard.avatar_url} onError={this.onError}/>

                <Card.Content>
                    <Card.Header>
                        <div>
                            <Input
                                className="avatar"
                                error={userCard.validation.avatarError}
                                placeholder='Avatar URL'
                                value={userCard.avatar_url === userImg ? "" : userCard.avatar_url}
                                onChange={this.handleAvatar}
                                size='small'
                            />
                            <span
                                className='error'>{(userCard.validation.avatarError) ? "Please enter a valid Image URL" : ""}
                            </span>
                        </div>

                        <div>
                            <Input
                                className="input-margin-top-5"
                                error={userCard.validation.loginError}
                                placeholder='Login'
                                value={userCard.login}
                                onChange={this.handleLogin}
                                size='small'
                            />
                            <span
                                className='error'>{(userCard.validation.loginError) ? "Please enter a valid login name" : ""}
                            </span>
                        </div>

                        <div>
                            <Input
                                className="input-margin-top-5"
                                error={userCard.validation.githubError}
                                placeholder='GitHub URl'
                                value={userCard.html_url}
                                onChange={this.handleGitHubURL}
                                size='small'
                            />
                            <span
                                className='error'>{(userCard.validation.githubError) ? "Please enter a valid GitHub URL" : ""}
                            </span>
                        </div>
                    </Card.Header>

                </Card.Content>

                <Card.Content extra>
                    <Button.Group>
                        <Button onClick={this.onCancelAddUserCard}>Cancel</Button>
                        <Button.Or/>
                        <Button onClick={this.onAddUserCard} primary>Save</Button>
                    </Button.Group>
                </Card.Content>
            </>
        )
    }
}

export default AddUserCard;



