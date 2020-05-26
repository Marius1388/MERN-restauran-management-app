import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input, Alert
} from 'reactstrap';



import {connect} from 'react-redux';
import {editFoodItem} from '../actions/foodItemActions';
import PropTypes from 'prop-types';

class EditFoodItemModal extends Component{
    state = {
        modal: false,
        name: '',
        category: '',
        msg:null
    }

    
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    dropdownOpen = () =>{
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    toggleDropDown = () =>{
        this.setState({
            toggleDropDown: !this.state.toggleDropDown
        })
    }

    toggle = () =>{
        this.setState({
            modal: !this.state.modal,
            msg: null
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
            name:this.state.name,
            category: this.state.category
        }  

        //Edit food item via editFoodItem action
        if(this.state.name && this.state.category){
            this.setState({ msg: null });
            this.props.editFoodItem(newItem);
            //Close the modal
            this.toggle();
        }else{
            this.setState({ msg: "Please enter all fields" });
           
        }
        
    }

    onSelect = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
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
                        Edit Item from Menu List
                    </ModalHeader>

                <ModalBody>
                {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for='foodItem'> Food Item</Label>
                            <Input  
                                type='text'
                                name= 'name'
                                id='foodItem'
                                placeholder='Edit food item'
                                onChange={this.onChange}
                            />
                            
                            <FormGroup>
                                <Label for="category">Food item's Category</Label>
                                <Input type="select" name="category" id="category" onClick={this.onSelect}>
                                    <option selected disabled>- Pick one -</option>
                                    <option value='Starters'>Starters</option>
                                    <option value='Soups'>Soups</option>
                                    <option value='From the grill'>From the grill</option>
                                    <option value="Chef's Delight">Chef's Delight</option>
                                    <option value='Cheese & Desserts'>Cheese & Desserts</option>
                                </Input>
                            </FormGroup> 
                            <Button
                                color='dark'
                                style={{marginTop:'2rem'}}
                                block
                            >Edit Food Item</Button>
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

export default connect(mapStateToProps, {addFoodItem})(EditFoodItemModal);