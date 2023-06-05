import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import checkout from "../../css/checkout.module.css";
import "../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../Redux/actions/allActions";
import { useEffect, useRef } from "react";
import allAddress from "../../Redux/reducers/storeAllAddress";
import { all } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getCredits from "../../getData/getCredits";
import getUser from "../../getData/getUser";
import { notify } from "../../alerts/toastify";
let i = 0;

function digits_count(n) {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
}

function CheckoutAddr() {
  let { planType } = useParams();
  console.log("plan type", planType);
  let navigate = useNavigate();
  var array = [1, 2, 3];
  let ref = useRef(null);
  let dispatch = useDispatch();
  let newAddress = useSelector((state) => state.addNewAddress);
  let allAddresses = JSON.parse(localStorage.getItem("allAddress"));
  console.log(allAddresses, "allAddresses--");

  async function handleClickAdd() {
    if (
      newAddress.saveAs &&
      newAddress.landmark &&
      newAddress.detailed &&
      newAddress.pincode
    ) {
      if (!newAddress.city) {
        console.log("setting def Bangalore");
        newAddress.city = "Bangalore";
      }
      if (digits_count(newAddress.pincode) < 6) {
        notify("enter valid pincode");
        return;
      }
      let user = await getUser(localStorage.getItem("username"));
      localStorage.setItem("credits", await getCredits(user._id));
      localStorage.setItem("selected_address", JSON.stringify(newAddress));
      newAddress.username = localStorage.getItem("username");
      let response = await fetch("http://localhost:3500/customer/address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          user_id: user._id,
          saveAs: newAddress.saveAs,
          city: newAddress.city,
          landmark: newAddress.landmark,
          detailed: newAddress.detailed,
          pincode: newAddress.pincode,
          floor: newAddress.floor,
        }),
      });
      if (response.status === 200) {
        let data = await response.json();
        console.log(data);
        console.log("success :", data.success);
        dispatch(allActions.addAddressActions.SetEmpty());
        console.log("Check if empty", newAddress);
        navigate(`payment`);
      }
    } else {
      notify("Please enter all fields");
    }
  }

  // getting all address from redux

  // async function fetchAllAddress() {
  //   if (localStorage.getItem("username")) {
  //     let allAddress = [];
  //     let response = await fetch(
  //       "http://localhost:3500/customer/address/getAddress",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: new URLSearchParams({
  //           // what is this ??
  //           username: localStorage.getItem("username"),
  //         }),
  //       }
  //     );
  //     if (response.status === 200) {
  //       allAddress = await response.json();
  //       console.log(allAddress);
  //       allAddresses = allAddress;
  //       console.log(allAddress, "ok");
  //       dispatch(allActions.setAll_Address(allAddress));
  //     } else {
  //       console.log(response.status);
  //       dispatch(allActions.setAll_Address(allAddress));

  //       // navigate();
  //     }
  //   }
  // }
  // useEffect(() => {
  //   fetchAllAddress();
  // }, [allAddresses]);
  // console.log(allAddresses, "all the addresses");
  return (
    <>
      <TopNavbar />
      <div className={checkout.body}>
        <div className={checkout.checkoutAddrLeft}>
          <div className={checkout.checkoutChooseAddress}>
            <h3>CHOOSE ADDRESS</h3>
          </div>
          <div className={checkout.checkoutAddressCard}>
            {localStorage.getItem("allAddress") ? (
              allAddresses.map((address, index) => {
                return (
                  <div>
                    <input
                      onClick={(e) => {
                        localStorage.setItem(
                          "selected_address",
                          JSON.stringify(allAddresses[e.target.value])
                        );
                        i++;
                        console.log(allAddresses[e.target.value]);
                      }}
                      type="radio"
                      id={index}
                      name="age"
                      value={index}
                    />
                    <label style={{ fontSize: "2vh" }} for={index}>
                      {address.saveAs} , {address.floor} ,{address.detailed} ,{" "}
                      {address.landmark} {address.city} , {address.pincode}
                    </label>
                  </div>
                );
              })
            ) : (
              <div>
                <input
                  onClick={(e) => {
                    console.log(e.target.value);
                  }}
                  type="radio"
                  id="age1"
                  name="age"
                  value="30"
                />
                <label for="age1">No saved Addresses</label>
              </div>
            )}

            {/* <div>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                id="age1"
                name="age"
                value="30"
              />
              <label for="age1">0 - 30</label>
            </div>
            <div>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                id="age2"
                name="age"
                value="60"
              />
              <label for="age2">31 - 60</label>
            </div>
            <div>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                id="age3"
                name="age"
                value="100"
              />
              <label for="age3">61 - 100</label>
            </div>
            <div>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                id="age3"
                name="age"
                value="100"
              />
              <label for="age3">61 - 100</label>
            </div>
            <div>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                id="age3"
                name="age"
                value="100"
              />
              <label for="age3">61 - 100</label>
            </div> */}
          </div>
        </div>
        <div className={checkout.checkoutAddrRight}>
          <div className={checkout.checkoutAddAddressCard}>
            <div className={checkout.checkoutAddAddressCardLine1}>
              <div>
                <p>Save As : </p>
              </div>
              <input
                onChange={(e) => {
                  dispatch(
                    allActions.addAddressActions.SetSaveAs(e.target.value)
                  );
                  console.log(newAddress);
                }}
                placeholder="Home"
                type="text"
              />
            </div>
            <div className={checkout.checkoutAddAddressCardLine2}>
              <input
                onChange={(e) => {
                  dispatch(
                    allActions.addAddressActions.SetCompleteAddress(
                      e.target.value
                    )
                  );
                  console.log(newAddress);
                }}
                placeholder="Complete Address"
                type="text"
              />
            </div>
            <div className={checkout.checkoutAddAddressCardLine3}>
              <input
                onChange={(e) => {
                  dispatch(
                    allActions.addAddressActions.SetFloor(e.target.value)
                  );
                  console.log(newAddress);
                }}
                placeholder="Floor(Optional)"
                type="text"
              />
            </div>
            <div className={checkout.checkoutAddAddressCardLine4}>
              <input
                onChange={(e) => {
                  dispatch(
                    allActions.addAddressActions.SetLandmark(e.target.value)
                  );
                  console.log(newAddress);
                }}
                placeholder="Landmark"
                type="text"
              />
            </div>
            <div className={checkout.checkoutAddAddressCardLine5}>
              <select
                onChange={(e) => {
                  dispatch(
                    allActions.addAddressActions.SetCity(e.target.value)
                  );
                  console.log(newAddress);
                }}
                // ref={ref}
                className="form-select cityDropDown"
                name="cars"
                id="days"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad"> Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi"> Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Chennai"> Chennai</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              <input
                onChange={(e) => {
                  dispatch(
                    allActions.addAddressActions.SetPincode(e.target.value)
                  );
                  console.log(newAddress);
                }}
                type="number"
                placeholder="Pincode"
              />
            </div>
          </div>
          <div
            id="add"
            ref={ref}
            onClick={handleClickAdd}
            type="button"
            className={checkout.checkoutAddBtn}
          >
            <h3>Add and Continue</h3>
          </div>
          <div
            onClick={async () => {
              let user = await getUser(localStorage.getItem("username"));
              localStorage.setItem("credits", await getCredits(user._id));
              // localStorage.setItem(
              //   "tempCredits",
              //   localStorage.getItem("credits")
              // );
              console.log(localStorage.getItem("credits"), "credits");
              if (localStorage.getItem("selected_address")) {
                navigate("payment");
              } else {
                notify("Choose Address field");
              }
            }}
            type="button"
            className={checkout.checkoutContinue}
          >
            <h3>Continue</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutAddr;
