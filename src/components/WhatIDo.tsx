import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
// ❌ removed gsap-trial import
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// ✅ keep same export (so other files don't break)
export let smoother: any;

const Navbar = () => {
  useEffect(() => {
    // ✅ fallback smoother (replaces ScrollSmoother without breaking logic)
    smoother = {
      scrollTop: (value: number) => {
        window.scrollTo({ top: value, behavior: "smooth" });
      },
      scrollTo: (target: any, _smooth?: boolean, _position?: string) => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      },
      paused: (_val: boolean) => {},
    };

    // keep your original logic untouched
    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => {
      // ❌ ScrollSmoother.refresh(true);
      // ✅ replaced with safe GSAP refresh
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AM
        </a>
        <a
          href="mailto:abirmondal8926@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          abirmondal8926@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>

          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;