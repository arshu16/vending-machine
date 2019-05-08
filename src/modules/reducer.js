import {Types} from "./actions";


const vendingMachineReducer = (state, action) => {
    if(action.type === Types.API_CALL_SUCCESS) {
        action.type = action.api;
    }
    switch (action.type) {
        case Types.INSERT_MONEY:
            return {
                ...state,
                money: action.payload
            };
        case Types.ADD_CHANGE: 
            return {
                ...state,
                change: action.payload
            };
        case Types.COLLECT_CHANGE: 
            return {
                ...state, 
                change: 0.0
            };
        case Types.GET_ITEM:
            return {
                ...state,
                money: action.payload.money,
                collectableItems: action.payload.collectableItems
            }
        case Types.COLLECT_ITEM:
            return {
                ...state,
                collectableItems: []
            }
        case Types.RETURN_CHANGE: 
            return {
                ...state,
                change: action.payload,
                money: 0.0
            }
        default:
            return state;
    }
};

export default vendingMachineReducer;