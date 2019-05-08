import * as BackendService from '../services/backendService';
export const Types = {
    INSERT_MONEY: "INSERT_MONEY",
    GET_ITEM: "GET_ITEM",
    COLLECT_CHANGE: "COLLECT_CHANGE",
    COLLECT_ITEM: "COLLECT_ITEM",
    RETURN_CHANGE: "RETURN_CHANGE",
    ADD_CHANGE: 'ADD_CHANGE',
    API_CALL: 'API_CALL',
    API_CALL_FAILURE: 'API_CALL_FAILURE',
    API_CALL_REQUEST: 'API_CALL_REQUEST',
    API_CALL_SUCCESS: 'API_CALL_SUCCESS'
};

const insertMoney = amount => {
   return { 
       type: Types.API_CALL,
        api: Types.INSERT_MONEY,
        request: () => BackendService.insertCoin(amount)
   }
};

const getItem = id  => {
    return { 
        type: Types.API_CALL,
         api: Types.GET_ITEM,
         request: () => BackendService.getItem(id)
    }
 };

const collectChange = () =>  {
    return { 
        type: Types.API_CALL,
         api: Types.COLLECT_CHANGE,
         request: () => BackendService.collectChange()
    }
 };

const collectItem = ()  => {
    return { 
        type: Types.API_CALL,
         api: Types.COLLECT_ITEM,
         request: () => BackendService.collectItem()
    }
 };;

const returnChange = () => {
    return { 
        type: Types.API_CALL,
         api: Types.RETURN_CHANGE,
         request: () => BackendService.returnChange()
    }
 };

const addChange = change  => {
    return { 
        type: Types.API_CALL,
         api: Types.ADD_CHANGE,
         request: () => BackendService.addChange(change)
    }
 };

export default {
    insertMoney,
    getItem,
    collectChange,
    collectItem,
    returnChange,
    addChange
};