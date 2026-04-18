import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ❌ removed trial plugins
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
// import { SplitText } from "gsap-trial/SplitText";

// ✅ simple custom SplitText replacement
class SplitText {
  el: HTMLElement;
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];

  constructor(element: HTMLElement, options: any) {
    this.el = element;

    const text = element.textContent || "";
    element.innerHTML = "";

    // split into words
    const words = text.split(" ");
    words.forEach((word) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";

      const chars = word.split("");
      chars.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        wordSpan.appendChild(charSpan);
        this.chars.push(charSpan);
      });

      element.appendChild(wordSpan);
      element.appendChild(document.createTextNode(" "));
      this.words.push(wordSpan);
    });
  }

  revert() {
    if (this.el) {
      this.el.innerHTML = this.el.textContent || "";
    }
  }
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");

    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }

    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  // ✅ prevent infinite loop issue
  ScrollTrigger.addEventListener("refresh", () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    setSplitText();
  });
}