console.clear();

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

let flipCtx;

const createTween = () => {
  let galleryElement = document.querySelector("#gallery-8");
  let galleryItems = galleryElement.querySelectorAll(".gallery__item");

  console.log(flipCtx);

  flipCtx && flipCtx.revert();
  galleryElement.classList.remove("gallery--final");

  flipCtx = gsap.context(() => {
    // Temporarily add the final class to capture the final state
    galleryElement.classList.add("gallery--final");
    const flipState = Flip.getState(galleryItems);
    galleryElement.classList.remove("gallery--final");

    const flip = Flip.to(flipState, {
      simple: true,
      ease: "expoScale(1, 5)"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryElement,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: galleryElement.parentNode
        // markers: true
      }
    });
    tl.add(flip);
    return () => gsap.set(galleryItems, { clearProps: "all" });
  });
};
createTween();

window.addEventListener("resize", createTween);

// Detect if device is touch-enabled
const isTouchDevice = () => {
  return (
    (typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        (window.DocumentTouch &&
          typeof document !== "undefined" &&
          document instanceof window.DocumentTouch))) ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) ||
    (typeof navigator !== "undefined" && navigator.msMaxTouchPoints > 0)
  );
};

const isTouch = isTouchDevice();

// Custom cursor for desktop only
if (!isTouch) {
  // Magnetic effect simulation (desktop only)
  const magneticButtons = document.querySelectorAll("button");
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

// Touch ripple effect for mobile devices
if (isTouch) {
  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.touches[0].clientX - rect.left - size / 2;
    const y = e.touches[0].clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");
    
    // Remove existing ripple
    const existingRipple = button.querySelector(".ripple");
    existingRipple && existingRipple.remove();
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  };

  const touchButtons = document.querySelectorAll(
    "button, a, .group, .material-symbols-outlined",
  );
  touchButtons.forEach((btn) => {
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.addEventListener("touchstart", createRipple);
  });
}
