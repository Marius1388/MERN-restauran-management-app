import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';
import {getFoodItems, deleteFoodItem} from '../actions/foodItemActions';
import PropTypes from 'prop-types';

class MenuList extends Component{

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteFoodItem: PropTypes.func.isRequired,
        foodItem: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getFoodItems();
    }

    onDeleteClick = id =>{
        this.props.deleteFoodItem(id);
    }

    render(){
        const {foodItems} = this.props.foodItem;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className ="menu-list">
                        {foodItems.map(({_id, name})=> (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    {this.props.isAuthenticated ?
                                       ( <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button>
                                        ) : null
                                      }
                                    {name}
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