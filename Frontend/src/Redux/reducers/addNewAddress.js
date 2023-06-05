const addNewAddress = (state = {}, action) => {
  switch (action.type) {
    case "SET_SaveAs":
      return {
        ...state,
        saveAs: action.payload,
      };
    case "SET_CompleteAddress":
      return {
        ...state,
        detailed: action.payload,
      };
    case "SET_FLOOR":
      return {
        ...state,
        floor: action.payload,
      };
    case "SET_LANDMARK":
      return {
        ...state,
        landmark: action.payload,
      };
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "SET_PINCODE":
      return {
        ...state,
        pincode: action.payload,
      };
    case "SET_EMPTY":
      return {};
    default:
      return state;
  }
};

export default addNewAddress;
