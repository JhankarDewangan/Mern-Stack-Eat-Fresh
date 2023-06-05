import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import "../css/styles.css";

function Profile() {
  return (
    <>
      <TopNavbar />
      <div className="profileBody">
        <div className="profileDiv">
          <div className="profileLabel">
            <p>
              <i class="fa-regular fa-user"></i>
              {"      "}Profile
            </p>
          </div>
          <div className="profileCard">
            <div>
              <div className="profileLabels">
                <p>Email ID</p>
                <p>dassouvik180@gmail.com</p>
              </div>{" "}
              <div className="profileEdit">
                <i class="fa-regular fa-pen-to-square fa-2x"></i>
              </div>
            </div>
            <div>
              {" "}
              <div className="profileLabels">
                <p>Name</p>
                <p>Souvik Das</p>
              </div>{" "}
              <div className="profileEdit">
                <i class="fa-regular fa-pen-to-square fa-2x"></i>
              </div>
            </div>
            <div>
              {" "}
              <div className="profileLabels">
                <p>Reset Password</p>
              </div>{" "}
              <div className="profileEdit">
                <i class="fa-regular fa-pen-to-square fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
