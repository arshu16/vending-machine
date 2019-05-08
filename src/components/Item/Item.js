import React from 'react';
import './Item.css';

class Item extends React.Component {
    constructor (props) {
        super(props)
        this.itemImgSrc = '';
    }
    componentDidMount (props) {
        import(`../../icons/${this.props.name}.svg`).then(svg => {
            this.itemImgSrc = svg.default;
            this.forceUpdate();
        });
    }
  
    render() {
        const {name, id, price} = this.props;
        return <div className="item">
            <div>
                {this.itemImgSrc && <img alt={name} src={this.itemImgSrc}/>}
                <p>{name}</p>
            </div>
            <div className="info">
                <p>{id}</p>
                <p>{price}</p>
            </div>
        </div>;
    }
  }
  
export default Item;