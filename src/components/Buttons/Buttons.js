import React from 'react';
import './Buttons.css';
import Actions from '../../modules/actions';
import {connect} from 'react-redux';

function Buttons(props) {
    return <div className="buttons">
        <div className="display">
            <p>Insert Coins</p>
            <p>$ {Number.parseFloat(props.money).toFixed(2)}</p>
        </div>
        <div className="item-buttons">
            <button type="button" onClick={props.getItem.bind(this, 1)} disabled={props.money < 2.50 }>1</button>
            <button type="button" onClick={props.getItem.bind(this, 2)} disabled={props.money < 3.10 }>2</button>
            <button type="button" onClick={props.getItem.bind(this, 3)} disabled={props.money < 2.00 }>3</button>
        </div>
        <div className="get-return-change">
            <button onClick={props.returnChange} disabled={props.money === 0 }>Return Change</button>
        </div>
        <div className="change-return-slot">
            <p onClick={props.collectChange} className="change-return-title">Click to collect change</p>
            <p className="change">$ {Number.parseFloat(props.change).toFixed(2)}</p>
        </div>
    </div>
}

const mapStateToProps = state => ({
    money: state.money,
    change: state.change,
    collectableItems: state.collectableItems
});

const mapDispatchToProps = ({
    returnChange: Actions.returnChange,
    collectChange: Actions.collectChange,
    getItem: Actions.getItem
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Buttons));