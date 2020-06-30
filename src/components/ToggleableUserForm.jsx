import React, {Component} from 'react'
import AddUserCard from "./AddUserCard";
import {Button,Icon} from "semantic-ui-react";


class ToggleableUserForm extends Component {

    state = {
        isOpen: false
    };

    handleOpenForm = () => {
        this.setState({isOpen: true})
    };

    handleCancelForm = () => {
        this.setState({isOpen: false})
    };

    userCardInfo = (user) => {
        this.props.newUserInfo(user)
    };

    render() {
        if (this.state.isOpen) {
            return <AddUserCard onAddUserCard={this.userCardInfo} onCancelAddUserCard={this.handleCancelForm}/>
        } else {
            return (
                <Button
                    className='add-button'
                    basic
                    primary
                    onClick={this.handleOpenForm}
                    >
                    <Icon name='plus'  size='large'/>
                </Button>
            )
        }
    }
}

export default ToggleableUserForm;