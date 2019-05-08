import actions from './actions'
import {Types} from './actions';


describe('actions', () => {
  it('should create an action to insert coin', () => {
    const amount = 1
    const expectedAction = {
        type: Types.API_CALL,
        api: Types.INSERT_MONEY,
        request: expect.any(Function)
    }
    expect(actions.insertMoney(amount)).toEqual(expectedAction)
  });

  it('should create an action to insert coin', () => {
    const amount = 1
    const expectedAction = {
        type: Types.API_CALL,
        api: Types.RETURN_CHANGE,
        request: expect.any(Function)
    }
    expect(actions.returnChange(amount)).toEqual(expectedAction)
  });
})