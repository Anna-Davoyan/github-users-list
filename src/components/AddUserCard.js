import React, {Component} from 'react';
import {Button, Image, Input} from "semantic-ui-react";
import userImg from '../image.jpg';
import uuid from 'react-uuid';

class AddUserCard extends Component {

    state = {
        login: '',
        html_url: '',
        avatar_url: '',
        errored: false,
        validation: {
            githubError: true,
            avatarError: true,
            loginError: true
        }
    };

    handleLogin = (e) => {
        const validation = this.state.validation;
        validation.loginError = true;
        this.setState({
            login: e.target.value,
            validation: validation
        })
    };
    handleGitHubURL = (e) => {
        const validation = this.state.validation;
        validation.githubError = true;
        this.setState({
            html_url: e.target.value,
            validation: validation
        })
    };
    handleAvatar = (e) => {
        const validation = this.state.validation;
        validation.avatarError = true;
        this.setState({
            avatar_url: e.target.value,
            errored: false,
            validation: validation
        })
    };
    onCancelAddUserCard = () => {
        this.props.onCancelAddUserCard();
    };
    onAddUserCard = () => {
        const validGithub = this.state.html_url.match("^https?:\\/\\/github.com\\/[a-zA-Z0-9].*");
        const validLogo = !!(this.state.login);
        const validation = {
            githubError: validGithub,
            avatarError: !this.state.errored,
            loginError: validLogo,
        };
        if (validation.githubError && validation.avatarError && validation.loginError) {
            const id = uuid();
            const user = {
                id: id,
                login: this.state.login,
                html_url: this.state.html_url,
                avatar_url: this.state.avatar_url
            };
            this.props.onAddUserCard(user);
            this.props.onCancelAddUserCard();
            this.setState({errored: false, avatar_url: ""})
        } else {
            this.setState({validation: validation})
        }
    };
    onError = () => {
        this.setState({
            errored: true,
        });
    };


    render() {
        const userCard = this.state;
        return (
            <React.Fragment>
                <div className="ui big image">
                    <Image src={userCard.errored ? userImg : userCard.avatar_url} onError={this.onError}/>
                </div>

                <div className="content">
                    <div className="header ui  input">
                        <Input className={`avatar ${(userCard.validation.avatarError) ? "" : " error"}`}
                               placeholder='Avatar URL'
                               value={userCard.avatar_url === userImg ? "" : userCard.avatar_url}
                               onChange={this.handleAvatar}/>
                        <span className='error'>{(userCard.validation.avatarError) ? "" : "Please enter a valid Image URL"}</span>
                        <Input className={`add-login ${(userCard.validation.loginError) ? "" : "error"}`}
                               placeholder='Login' value={userCard.login}
                               onChange={this.handleLogin}/>
                        <span className='error'>{(userCard.validation.loginError) ? "" : "Please enter a Login"}</span>
                        <Input className={`add-login ${(userCard.validation.githubError) ? "" : "error"}`}
                               placeholder='GitHub URl' value={userCard.html_url}
                               onChange={this.handleGitHubURL}/>
                        <span className='error'>{(userCard.validation.githubError) ? "" : "Please enter a valid GitHub URL"}</span>
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



