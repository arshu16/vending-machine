import React from 'react';
import './Innards.css';
import Buttons from '../Buttons/Buttons';
import Collector from '../Collector/Collector';
import Items from '../Items/Items';

function Innards() {
    return (
       <div className="innards">
            <Items></Items> 
            <Buttons></Buttons>
            <Collector></Collector>
       </div>
    );
}

export default Innards;
