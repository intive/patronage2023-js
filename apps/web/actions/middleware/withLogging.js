const withLogging = (reducer) => (state, action) => {
  const newState = reducer(state, action);
  return newState;
};

export default withLogging;
