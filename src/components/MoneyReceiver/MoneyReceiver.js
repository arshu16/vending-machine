import React from 'react';
import './MoneyReceiver.css';
import {connect} from 'react-redux';
import Actions from '../../modules/actions';

const validDenominations = [0.1, 0.2, 0.5, 1, 2];

function MoneyReceiver(props) {

    const insertMoney = (amount) => {
        if(validDenominations.indexOf(amount) > -1) {
            props.insertMoney(amount);
        } else {
            props.addChange(amount);
        }
    }

    return <div className="money-buttons">
        <button onClick={insertMoney.bind(this, 0.05)}>Insert 5c</button>
        <button onClick={insertMoney.bind(this,0.1)}>Insert 10c</button>
        <button onClick={insertMoney.bind(this,0.2)}>Insert 20c</button>
        <button onClick={insertMoney.bind(this,0.5)}>Insert 50c</button>
        <button onClick={insertMoney.bind(this,1)}>Insert 1$</button>
        <button onClick={insertMoney.bind(this,2)}>Insert 2$</button>
    </div>
}

const mapDispatchToProps = ({
    insertMoney: Actions.insertMoney,
    addChange: Actions.addChange
})

export default connect(null, mapDispatchToProps)(MoneyReceiver);

