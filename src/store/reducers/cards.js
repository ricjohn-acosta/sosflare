import * as actions from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
  sortBy: null,
  find: null,
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

const sortBy = (state, payload) => {
  return {
    ...state,
    sortBy: payload,
  }
}

const find = (state, payload) => {
  return {
    ...state,
    find: payload,
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

    case actions.SORT_BY_MONSTER:
      return sortBy(state, payload)

    case actions.FIND_USER:
      return find(state, payload)

    default:
      return state
  }
}
