const SetCompleteAddress = (data) => {
  return {
    type: "SET_CompleteAddress",
    payload: data,
  };
};

const SetSaveAs = (data) => {
  return {
    type: "SET_SaveAs",
    payload: data,
  };
};

const SetFloor = (data) => {
  return {
    type: "SET_FLOOR",
    payload: data,
  };
};

const SetCity = (data) => {
  return {
    type: "SET_CITY",
    payload: data,
  };
};

const SetPincode = (data) => {
  return {
    type: "SET_PINCODE",
    payload: data,
  };
};

const SetLandmark = (data) => {
  return {
    type: "SET_LANDMARK",
    payload: data,
  };
};

const SetEmpty = () => {
  return {
    type: "SET_EMPTY",
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  SetCompleteAddress,
  SetCity,
  SetLandmark,
  SetPincode,
  SetSaveAs,
  SetFloor,
  SetEmpty,
};
