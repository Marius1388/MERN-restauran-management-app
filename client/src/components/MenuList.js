import React, {Component, Fragment} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';
import {getFoodItems, deleteFoodItem, editFoodItem} from '../actions/foodItemActions';
import PropTypes from 'prop-types';

class MenuList extends Component{

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteFoodItem: PropTypes.func.isRequired,
        editFoodItem: PropTypes.func.isRequired,
        foodItem: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getFoodItems();
    }

    onDeleteClick = id =>{
        this.props.deleteFoodItem(id);
    }

    onEditClick = foodItem =>{
        editFoodItem(foodItem);
    }

    render(){
        const {foodItems} = this.props.foodItem;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className ="menu-list">
                        {foodItems.map(({_id, name, category})=> (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <h3> {this.props.isAuthenticated ?
                                       ( <Fragment>
                                           <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                            >&times;</Button>
                                            {/* <Button
                                            className="edit-btn m-2"
                                            color="warning"
                                            size="sm"
                                            onClick={this.onEditClick.bind(this, _id)}
                                            >Edit</Button> */}
                                        </Fragment>
                                        ) : null
                                      }
                                      {name}
                                      
                                      </h3>
                                      <h5>Category: {category}</h5>
                                    
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

 

const mapStateToProps = (state) => ({
    foodItem: state.foodItem,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{getFoodItems,deleteFoodItem})(MenuList);