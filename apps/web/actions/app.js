import withReducerContext from "actions/middleware/withReducerContext";

export const actions = {
  CLOSE_MODAL: "modal-close",
  OPEN_MODAL: "modal-open",
};

// reducer

export const reducer = (state, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.CLOSE_MODAL:
      return { ...state, isModalOpen: false };

    case actions.OPEN_MODAL:
      return { ...state, isModalOpen: true };

    case actions.SET_BUDGET:
      return { ...state, budget: payload };

    default:
      break;
  }

  return state;
};

// action hook

export const useActions = withReducerContext(actions, reducer);

// actions

/**
 * Close modal and clear up the contents
 *
 */
export const closeModal = () => {
  actions.dispatch({ type: actions.CLOSE_MODAL });
};

/**
 * Open modal and set its contents
 *
 * @param {string} payload Modal content
 */
export const openModal = () => {
  actions.dispatch({ type: actions.OPEN_MODAL });
};

export const setBudget = (payload) => {
  actions.dispatch({ type: actions.SET_BUDGET, payload });
};
