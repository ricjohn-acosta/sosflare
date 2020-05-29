import * as actions from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
  sortBy: null,
  find: null,
  currentPage: 1,
  lastItem: null,
  prevPageRef: [],
  currentUsername: null,
}

// HELPER FUNCTIONS
const addCardStart = state => {
  return {
    ...state,
    loading: true,
  }
}

const addCardSuccess = (state, payload) => {
  return {
    ...state,
    error: false,
    loading: false,
    currentUsername: payload
  }
}

const addCardFail = (state, payload) => {
  return {
    ...state,
    error: payload,
    loading: false,
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

const changePage = (state, payload) => {
  return {
    ...state,
    currentPage: payload,
  }
}
const loadNextPage = (state, payload) => {
  return {
    ...state,
    lastItem: payload,
  }
}
const savePrevPageRef = (state, payload) => {
  return {
    ...state,
    prevPageRef: [...state.prevPageRef, payload],
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_CARD_START:
      return addCardStart(state)

    case actions.ADD_CARD_SUCCESS:
      return addCardSuccess(state, payload)

    case actions.ADD_CARD_FAIL:
      return addCardFail(state, payload)

    case actions.ADD_CARD_END:
      return addCardEnd(state)

    case actions.SORT_CARDS:
      return sortBy(state, payload)

    case actions.FIND_USER:
      return find(state, payload)

    case actions.CHANGE_PAGE:
      return changePage(state, payload)

    case actions.NEXT_PAGE:
      return loadNextPage(state, payload)

    case actions.PREV_PAGE_REF:
      return savePrevPageRef(state, payload)

    default:
      return state
  }
}
