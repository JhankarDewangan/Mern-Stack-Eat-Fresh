const allAddress = (state = {}, action) => {
  switch (action.type) {
    case "SET_All_Address":
      return {
        ...state,
        Addresses: action.payload,
      };

    default:
      return state;
  }
};

export default allAddress;
