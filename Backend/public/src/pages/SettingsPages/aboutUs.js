import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import aboutUs from "../../css/settings.module.css";

function AboutUs() {
  return (
    <>
      <TopNavbar />
      <div className={aboutUs.body}>
        <div className={aboutUs.aboutUsBody}>
          <p className={aboutUs.aboutUsHeading}>About Us</p>
          <div className={aboutUs.aboutUsContent}>
            <span style={{ color: "rgba(81, 153, 56, 0.9)" }}>
              Generally Students Generally Students and Bachelors who get
              relocated from their home town for work or study related purposes,
              These people face a lot of problems acquiring good quality daily
              food , that's healthy and hygienic and also pocket friendly at the
              same time , so that one can have that everyday of the month as
              their staple, usually managing food becomes a big challenge for
              these people , In fact a lot of them fall sick because of
              irregular food habits that people develop when they live outside
              of home, The only way to solve this is if people like us found a
              source of hygienic food that's like home cooked food , which is
              good for the health and also something reasonable that can be
              afforded 3 times a day everyday, So we came up with this idea of
              having a meal plan service , where we provide our users various
              food plans to choose from depending upon their needs, The basic
              goal is to provide good and hygienic food at a reasonable
              (affordable) rate.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
