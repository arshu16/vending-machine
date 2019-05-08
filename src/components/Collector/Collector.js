import React from 'react';
import './Collector.css';
import Actions from '../../modules/actions';
import { connect } from 'react-redux';

function Collector(props) {
    return <div className="collector">
        {props.collectableItems.length > 0 &&
            <>
                <p onClick={props.collectItem}>Click here to collect all items</p>
                <p>{props.collectableItems.join(', ')}</p>   
            </>
        }

    </div>
}

const mapStateToProps = state => ({
    collectableItems: state.collectableItems
});

const mapDispatchToProps = ({
    collectItem: Actions.collectItem
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Collector));