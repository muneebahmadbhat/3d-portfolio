// 3D Portfolio with Animations, Sounds, and Polished Overlays

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { useState, useRef } from "react";
import "./App.css";

const clickSound = new Audio("/click.wav");

function ResumeBox({ position, label, onClick }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  const handleClick = () => {
    clickSound.play();
    onClick();
  };

  return (
    <mesh position={position} onClick={handleClick} ref={ref}>
      <boxGeometry args={[2, 1, 0.5]} />
      <meshStandardMaterial
        color="#61dafb"
        emissive="#007acc"
        emissiveIntensity={0.2}
      />
      <Html center style={{ pointerEvents: "none" }}>
        <div style={{ color: "black", fontSize: "14px", fontWeight: "bold" }}>
          {label}
        </div>
      </Html>
    </mesh>
  );
}

function Overlay({ label, content, onClose }) {
  return (
    <div className="overlay animated">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <h2>{label}</h2>
      <p>{content}</p>
      {label === "About Me" && (
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn"
        >
          View Resume PDF
        </a>
      )}
    </div>
  );
}

function Scene({ onSectionClick }) {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Stars radius={100} depth={50} count={2000} factor={4} fade />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      <ResumeBox
        position={[-4, 2, 0]}
        label="About Me"
        onClick={() => onSectionClick("About Me")}
      />
      <ResumeBox
        position={[0, 2, 0]}
        label="Skills"
        onClick={() => onSectionClick("Skills")}
      />
      <ResumeBox
        position={[4, 2, 0]}
        label="Projects"
        onClick={() => onSectionClick("Projects")}
      />
      <ResumeBox
        position={[-2, -2, 0]}
        label="Education"
        onClick={() => onSectionClick("Education")}
      />
      <ResumeBox
        position={[2, -2, 0]}
        label="Contact"
        onClick={() => onSectionClick("Contact")}
      />
    </Canvas>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const contentMap = {
    "About Me":
      "Hi, I am Muneeb Ahmad, a frontend developer passionate about building interactive UIs. Click below to view my resume.",
    Skills:
      "React.js, JavaScript, HTML, CSS, Tailwind, Git, Three.js, Firebase, REST APIs",
    Projects:
      "1. Portfolio Site\n2. Todo App\n3. Weather App\n4. E-commerce UI (React + Tailwind)",
    Education:
      "Bachelor of Computer Applications (BCA), Final Year\nRelevant Courses: Data Structures, Web Development, Computer Graphics",
    Contact:
      "📧 muneeb@example.com\n🔗 GitHub: github.com/muneeb\n🔗 LinkedIn: linkedin.com/in/muneeb-ahmad",
  };

  return (
    <div className="App">
      <Scene onSectionClick={(section) => setActiveSection(section)} />
      {activeSection && (
        <Overlay
          label={activeSection}
          content={contentMap[activeSection]}
          onClose={() => setActiveSection(null)}
        />
      )}
    </div>
  );
}

export default App;
