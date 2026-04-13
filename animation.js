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


        const cursor = document.getElementById("cursor");
        document.addEventListener("mousemove", (e) => {
          cursor.style.left = e.clientX + "px";
          cursor.style.top = e.clientY + "px";
        });

        const interactables = document.querySelectorAll(
          "button, a, .group, .material-symbols-outlined",
        );
        interactables.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            cursor.style.width = "40px";
            cursor.style.height = "40px";
            cursor.style.background = "rgba(95, 94, 94, 0.2)";
            cursor.style.backdropFilter = "blur(1px)";
          });
          item.addEventListener("mouseleave", () => {
            cursor.style.width = "9px";
            cursor.style.height = "9px";
            cursor.style.background = "#ffffff";
            cursor.style.backdropFilter = "none";
          });
        });

        // Magnetic effect simulation
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

        //Rotate text animation
        // const rotateText = document.querySelectorAll(".text-rotate");
        // rotateText.forEach((text) => {
        //   text.addEventListener("mousemove", (e) => {
        //     text.classList.add("slide-up");
        //   });
        //   text.addEventListener("mouseleave", (e) => {
        //     text.classList.remove("slide-up");
        //   });       
        // });