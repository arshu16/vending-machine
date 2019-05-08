import React from 'react';
import './Machine.css';
import Innards from '../Innards/Innards';
import MoneyReceiver from '../MoneyReceiver/MoneyReceiver';

function Machine() {
    return (
        <main className="machine">
            <div className="box">
                <Innards></Innards>
                <div className="legs clearfix">
                    <div className="leg-left">
                    </div>
                    <div className="leg-right">
                    </div>
                </div>
            </div>
            <MoneyReceiver></MoneyReceiver>
        </main>
    );
}

export default Machine;
