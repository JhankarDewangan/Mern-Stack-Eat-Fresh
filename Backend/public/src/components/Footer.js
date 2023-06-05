import "../css/styles.css";

export default function Footer() {
  return (
    <div className="lowerFooter">
      <div className="footerIcons">
        <i class="fa-brands fa-facebook fa-2x f_icon"></i>
        <i class="fa-brands fa-instagram  fa-2x f_icon"></i>{" "}
        <i class="fa-regular fa-envelope fa-2x f_icon"></i>
      </div>
      <div className="footerCopyRight">
        <span
          style={{
            fontWeight: "bolder",
            fontSize: "2vh",
            color: "rgba(46, 114, 22, 1)",
          }}
        >
          <i class="fa-regular fa-copyright fa-1x"></i> COPYRIGHT EATFRESH
        </span>
      </div>
    </div>
  );
}
