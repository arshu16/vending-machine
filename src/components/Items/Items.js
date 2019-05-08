import React from 'react';
import './Items.css';
import Item from '../Item/Item';
import {connect} from 'react-redux';

function Items (props) {
    const ids = Object.keys(props.items);
    return <div className="items">
        {ids.map(id => {
            return <Item key={id} id={id} price={props.items[id].price} name={props.items[id].name}/>
        })}
    </div>
}

const mapStateToProps = state => ({
    items: state.items
})

export default connect(mapStateToProps, null)(Items);