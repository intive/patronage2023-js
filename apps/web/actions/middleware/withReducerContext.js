import { useReducer } from 'react';
import withLogging from 'actions/middleware/withLogging';

const withReducerContext = (actions, reducer) => {
  const useActionsHook = (initialState) => {
    const [state, dispatch] = useReducer(withLogging(reducer), initialState);
    actions.dispatch = dispatch;
    return state;
  };
  return useActionsHook;
};

export default withReducerContext;
