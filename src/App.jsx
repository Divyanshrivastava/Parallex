import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
  let [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".character", {
      scale: 0.6,
      x: "-50%",
      bottom: "-30%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
       <div className="fixed top-0 left-0 w-full h-screen bg-black z-[-1]"></div>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
            <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYmid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="150"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  ARISE
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg2.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hiiden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo">
                <img
                  className=" absolute top-0 left-0 w-[15rem] translate-x-1/6 translate-y-1"
                  src="./logo.png"
                  alt=""
                />
              </div>
            </div>
            <div className="imagesdiv overflow-hidden relative w-full h-screen">
              <img
                className="absolute sky scale-[1.5] top-0 left-0 rotate-[-20deg] w-full h-full object-cover"
                src="./bg2.png"
                alt="sky background"
              />
              <img
                className=" absolute bg scale-[1.8] rotate-[-5deg] top-0 left-0 w-full h-full object-cover"
                src="./glass.png"
              />

              <div className="text absolute top-1/3 right-[12%] scale-[1.4] rotate-[-10deg]">
                <img className="w-[20rem]" src="./chant.png" alt="" />
              </div>
              <img
                className="absolute character -bottom-[250%] left-1/2 -translate-x-1/2  scale-[1.2] rotation-[-25deg]"
                src="./sjw.png"
                alt=""
              />
            </div>
            <div className="btmbar absolute text-white bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 item-center">
                <i className=" text-2xl ri-arrow-down-line"></i>
                <h3 className=" text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[55px]"
                src="./ps5.png"
                alt=""
              />
            </div>
            <img
              className="absolute top-7 right-15 h-[5rem] invert sepia saturate-200 hue-rotate-180 brightness-150 contrast-200"
              src="./unreal.png"
              alt=""
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden ">
            <div className="cntnr flex text-white w-full h-[80%] mt-30 mb-20">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute w-[25rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[56%] ">
                <h1 className=" mt-10 text-5xl">The Shadow <span className="text-blue-500">Monarch</span></h1>
                <p className="mt-5 text-[18px] max-w-2xl font-[Helvetica_Now_Display]">
                  Solo Leveling is a groundbreaking action-fantasy manhwa that
                  follows the story of Sung Jin-Woo, the world’s weakest hunter
                  who transforms into its most powerful force. After surviving a
                  brutal double dungeon, he awakens with the unique ability to
                  "level up" — a system-like power that allows him to grow
                  stronger with every battle.
                </p>
                <p className="mt-5 text-[18px] font-[Helvetica_Now_Display] max-w-2xl">
                  The world once mocked him as the weakest, but that was before
                  he awakened. Now, with shadows at his command and limitless
                  power at his fingertips, he walks through dungeons like a
                  reaper in the dark. Those who once ignored him now fear the
                  name: Sung Jin-Woo, the Shadow Monarch.
                </p>
                <button className="bg-blue-600 px-7 py-7 text-white mt-10 text-3xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
