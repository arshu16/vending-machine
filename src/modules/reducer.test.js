import reducer from './reducer'
import {Types} from './actions'

describe('vending machine reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(undefined)
  });

  it('should handle add money', () => {
    expect(reducer({
        money: 0.0
    }, {
        payload: 2.0,
        type: Types.INSERT_MONEY
    })).toEqual({money: 2.0})
  });

})