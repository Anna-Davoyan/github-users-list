import React, {Component} from 'react'
import AddUserCard from "./AddUserCard";
import {Button} from "semantic-ui-react";


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
                <Button className='ui center floated basic icon button add-button' primary
                        onClick={this.handleOpenForm}>
                    <i className='plus blue large icon'/>
                </Button>
            )
        }
    }


}

export default ToggleableUserForm;