import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);
  const cursorRef = useRef(null);

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced loading animation
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
          setShowContent(true);
          setIsLoading(false);
          this.kill();
        }
      },
    });
  });

  // Enhanced parallax and scroll animations
  useGSAP(() => {
    if (!showContent) return;

    // Initial entrance animations with stagger
    const tl = gsap.timeline();
    
       tl.to(".main", {
  scale: 1,
  rotate: 0,
  duration: 1.5,
  ease: "expo.inOut",
});

// 2. Start sky just before main ends (overlap)
tl.to(".sky", {
  scale: 1.1,
  rotate: 0,
  duration: 1.5,
  ease: "expo.inOut",
}, "-=1.2");

// 3. Bring in bg and character together, overlapping sky
tl.to([".bg", ".character"], {
  scale: (i, el) => el.classList.contains("character") ? 0.6 : 1,
  x: (i, el) => el.classList.contains("character") ? "-50%" : 0,
  bottom: (i, el) => el.classList.contains("character") ? "-30%" : undefined,
  rotate: 0,
  duration: 1.5,
  ease: "expo.inOut",
}, "-=1.3");

// 4. Text fade/scale - overlap character entry
tl.to(".text", {
  scale: 1,
  rotate: 0,
  duration: 1.5,
  ease: "expo.inOut",
}, "-=1.2");

    // Enhanced parallax mousemove with boundaries
    const main = mainRef.current;
    if (main) {
      main.addEventListener("mousemove", function (e) {
        const rect = main.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        const xMove = x * 40;
        const yMove = y * 20;
        
        gsap.to(".main .text", {
          x: `${xMove * 0.4}%`,
          y: `${yMove * 0.2}%`,
          duration: 0.5,
          ease: "power2.out"
        });
        
        gsap.to(".sky", {
          x: xMove * 0.5,
          y: yMove * 0.3,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(".bg", {
          x: xMove * 1.2,
          y: yMove * 0.8,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: ".second-section",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        gsap.fromTo(".content-image", 
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
        gsap.fromTo(".content-text", 
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
        );
      }
    });

    // Floating animation for character
    gsap.to(".character", {
      y: "+=10",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Glowing effect animation
    gsap.to(".glow-effect", {
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, [showContent]);

  return (
    <>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-screen bg-black z-[-1]"></div>
      
      {/* Loading Screen */}
      {isLoading && (
        <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-blue-900">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
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
                    fontFamily="Arial Black, sans-serif"
                    style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                      textShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
                    }}
                  >
                    ARISE
                  </text>
                </g>
              </mask>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="50%" stopColor="#000000" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#bgGradient)" mask="url(#viMask)" />
            <image
            href="./bg2.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
          </svg>
          
          {/* Sung Jin-Woo character in loading screen */}
          {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              className="w-[30rem] h-auto opacity-20 scale-150"
              src="./sjw.png"
              alt="Sung Jin-Woo silhouette"
            />
          </div> */}
          
          {/* Loading indicator */}
          {/* <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div> */}
        </div>
      )}

      {showContent && (
        <div ref={mainRef} className="main w-full rotate-[-10deg] scale-[1.7]">
          {/* Hero Section */}
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            {/* Enhanced Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo">
                 <img
                  className=" absolute top-0 left-0 w-[12rem] translate-x-1/6 translate-y-1"
                  src="./logo.png"
                  alt=""
                />
              </div>
              
              {/* Navigation Menu */}
              <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-9">
                <ul className="flex space-x-8 text-white text-lg font-[Helvetica_Now_Display]">
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Home</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Story</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Characters</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Gallery</li>
                </ul>
              </nav>
            </div>

            {/* Enhanced Images with Glowing Effects */}
            <div className="imagesdiv overflow-hidden relative w-full h-screen">
              <img
                className="absolute sky scale-[1.5] top-0 left-0 rotate-[-10deg] w-full h-full object-cover"
                src="./bg2.png"
                alt="sky background"
              />
              
              {/* Glow overlay */}
              <div className="glow-effect absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
              
              <img
                className="absolute bg scale-[1.8] rotate-[-5deg] top-0 left-0 w-full h-full object-cover"
                src="./glass.png"
                alt="Glass effect"
              />

              {/* Enhanced Text with Glow */}
              <div className="text absolute top-1/3 right-[12%] scale-[1.4] rotate-[-10deg]">
                <img 
                  className="w-[20rem] filter drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" 
                  src="./chant.png" 
                  alt="Chant text"
                />
              </div>
              
              {/* Character with enhanced effects - FIXED POSITIONING */}
              <img
                className="absolute character -bottom-[250%] left-1/2 scale-[1.2] rotation-[-25deg]"
                src="./sjw.png"
                alt=""
              />

              {/* Floating particles */}
              {/* <div className="particles absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div> */}
            </div>

            {/* Enhanced Bottom Bar */}
            <div className="btmbar absolute text-white bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex gap-4 items-center cursor-pointer hover:text-blue-400 transition-colors">
                <i className="text-2xl ri-arrow-down-line animate-bounce"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[55px] hover:scale-110 transition-transform"
                src="./ps5.png"
                alt="PlayStation 5"
              />
            </div>

            {/* Enhanced Unreal Engine Logo */}
            <img
              className="absolute top-7 right-15 h-[5rem] invert sepia saturate-200 hue-rotate-180 brightness-150 contrast-200 hover:scale-110 transition-transform"
              src="./unreal.png"
              alt="Unreal Engine"
            />
          </div>

          {/* Enhanced Second Section */}
          <div className="second-section w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-900 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl"></div>
            </div>

            <div className="cntnr flex text-white w-full h-[80%] mt-35 mb-30 relative z-10">
              <div className="content-image limg relative w-1/2 h-full">

                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[27rem] border-2 border-blue-500/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                 </div>
                <img
                  className="absolute w-[25rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter drop-shadow-2xl"
                  src="./imag.png"
                  alt="Character illustration"
                />  
              </div>

              <div className="content-text rg w-[56%] space-y-6">
                <h1 className="mt-10 text-6xl font-bold bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
                  The Shadow <span className="text-blue-400">Monarch</span>
                </h1>
                
                <div className="space-y-4">
                  <p className="text-lg max-w-2xl font-[Helvetica_Now_Display] leading-relaxed opacity-90">
                    Solo Leveling is a groundbreaking action-fantasy manhwa that
                    follows the story of Sung Jin-Woo, the world's weakest hunter
                    who transforms into its most powerful force. After surviving a
                    brutal double dungeon, he awakens with the unique ability to
                    "level up" — a system-like power that allows him to grow
                    stronger with every battle.
                  </p>

                  <p className="text-lg max-w-2xl font-[Helvetica_Now_Display] leading-relaxed opacity-90">
                    The world once mocked him as the weakest, but that was before he awakened. Now, with shadows at his command and limitless power at his fingertips, he walks through dungeons like a reaper in the dark. Those who once ignored him now fear the name: Sung Jin-Woo, the Shadow Monarch.
                  </p>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-2 mt-8 max-w-2xl">
                  <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-400 ">S-Rank</div>
                    <div className="text-sm opacity-75  font-[Helvetica_Now_Display]">Hunter Level</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-4xl font-bold text-purple-400">∞</div>
                    <div className="text-sm opacity-75 font-[Helvetica_Now_Display]">Shadow Army</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-yellow-400">MAX</div>
                    <div className="text-sm opacity-75 font-[Helvetica_Now_Display]">Authority</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
};

export default App;
