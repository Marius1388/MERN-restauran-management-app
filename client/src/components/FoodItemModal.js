import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'


import {connect} from 'react-redux';
import {addFoodItem} from '../actions/foodItemActions';
import PropTypes from 'prop-types';

class FoodItemModal extends Component{
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name:this.state.name
        }

        //Add food item via addFoodItem action
        this.props.addFoodItem(newItem);

        //Close the modal

        this.toggle();
    }

    render(){
        return(
            <div>
                {this.props.isAuthenticated ?
                <Button
                    color='dark'
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                    Add Food Item
                </Button>   
                : <h4 className="mb-3 ml-4">Please log in to manage food items</h4>             
            }



                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add to Menu List
                    </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for='foodItem'> Food Item</Label>
                            <Input  
                                type='text'
                                name= 'name'
                                id='foodItem'
                                placeholder='Add food item'
                                onChange={this.onChange}
                            />
                            <Button
                                color='dark'
                                style={{marginTop:'2rem'}}
                                block
                            >Add Food Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodItem: state.foodItem,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addFoodItem})(FoodItemModal);