import * as actions from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
}

// HELPER FUNCTIONS
const addCardStart = state => {
  return {
    ...state,
    loading: true,
  }
}

const addCardSuccess = state => {
  return {
    ...state,
    error: false,
  }
}

const addCardFail = (state, payload) => {
  return {
    ...state,
    error: payload,
  }
}

const addCardEnd = state => {
  return {
    ...state,
    loading: false,
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_CARD_START:
      return addCardStart(state)

    case actions.ADD_CARD_SUCCESS:
      return addCardSuccess(state)

    case actions.ADD_CARD_FAIL:
      return addCardFail(state, payload)

    case actions.ADD_CARD_END:
      return addCardEnd(state)

    default:
      return state
  }
}
