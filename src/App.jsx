import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080a0f;
    --surface: #0d1117;
    --surface2: #131920;
    --border: rgba(255,255,255,0.07);
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --text: #e8eaed;
    --muted: #a0a8b4;
    --font-display: 'Bebas Neue', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  ::selection { background: var(--accent); color: #000; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: linear-gradient(to bottom, rgba(8,10,15,0.95) 0%, transparent 100%);
    backdrop-filter: blur(0px);
    transition: backdrop-filter 0.3s, background 0.3s;
  }
  .nav.scrolled {
    background: rgba(8,10,15,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 24px;
    letter-spacing: 2px;
    color: var(--accent);
    text-decoration: none;
  }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 48px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero-content { position: relative; z-index: 2; max-width: 900px; animation: fadeUp 1s ease both; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-mono);
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
  }
  .hero-tag::before {
    content: ''; display: block;
    width: 24px; height: 1px; background: var(--accent);
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(72px, 12vw, 160px);
    line-height: 0.9;
    letter-spacing: 2px;
    color: var(--text);
    margin-bottom: 8px;
  }
  .hero-name span { color: var(--accent); }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(24px, 4vw, 48px);
    letter-spacing: 4px;
    color: var(--muted);
    margin-bottom: 40px;
  }
  .hero-desc {
    font-size: 16px; line-height: 1.7;
    color: var(--muted);
    max-width: 520px;
    margin-bottom: 48px;
  }
  .hero-cta {
    display: flex; gap: 16px; flex-wrap: wrap;
  }
  .hero-cta a, .hero-cta button {
  pointer-events: all;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px;
    background: var(--accent); color: #000;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 1.5px; text-transform: uppercase;
    text-decoration: none;
    font-weight: 500;
    transition: transform 0.2s, box-shadow 0.2s;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(232,255,71,0.3);
  }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px;
    border: 1px solid var(--border); color: var(--text);
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 1.5px; text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
  .hero-stats { position: absolute; right: 48px; bottom: 80px; display: flex; flex-direction: column; gap: 24px; z-index: 2; }
  .stat { text-align: right; }
  .stat-num {
    font-family: var(--font-display);
    font-size: 40px; letter-spacing: 1px;
    color: var(--accent); line-height: 1;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted);
  }

  /* SECTION SHARED */
  .section { padding: 100px 48px; }
  .section-header {
    display: flex; align-items: baseline; gap: 20px;
    margin-bottom: 64px;
  }
  .section-num {
    font-family: var(--font-mono);
    font-size: 11px; color: var(--accent);
    letter-spacing: 2px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 64px);
    letter-spacing: 2px;
    color: var(--text);
  }
  .section-line {
    flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
    margin-bottom: 6px;
  }

  /* FEATURED PROJECTS */
  .featured { background: var(--bg); }
  .featured-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .featured-card {
    position: relative;
    background: var(--surface);
    overflow: hidden;
    cursor: pointer;
    border: 4px solid var(--accent);
  }
  .featured-card::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(
      to top,
      rgba(8,10,15,0.95) 0%,
      rgba(8,10,15,0.4) 50%,
      transparent 100%
    );
    transition: opacity 0.4s;
    pointer-events: none; 
  }
  .featured-card.playing::before { opacity: 0.2; }
  .video-thumb {
    width: 100%; aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }
  .featured-card:hover .video-thumb { transform: scale(1.03); }
  .featured-iframe {
    width: 100%; aspect-ratio: 16/9;
    display: block; border: none;
  }
  .featured-info {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 28px 32px;
    z-index: 2;
    transition: transform 0.4s, opacity 0.4s;
  }
  .featured-card.playing .featured-info {
    transform: translateY(8px); opacity: 0;
    pointer-events: none;
  }
  .featured-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 10px;
  }
  .featured-badge::before {
    content: '▶'; font-size: 8px;
  }
  .featured-title {
    font-family: var(--font-display);
    font-size: 32px; letter-spacing: 1px;
    color: var(--text); line-height: 1;
    margin-bottom: 8px;
  }
  .featured-sub {
    font-family: var(--font-mono);
    font-size: 11px; color: var(--muted);
    letter-spacing: 1px;
  }
  .play-btn {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 64px; height: 64px;
    border: 2px solid rgba(255,255,255,0.8);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(4px);
    transition: all 0.3s;
    cursor: pointer;
    font-size: 20px;
    color: #fff;
    padding-left: 4px;
  }
  .play-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #000;
    transform: translate(-50%, -50%) scale(1.1);
  }
  .featured-card.playing .play-btn { display: none; }
  .featured-tags {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-top: 10px;
  }
  .featured-card.playing:hover ~ .cursor,
  .featured-card.playing iframe {
  cursor: default;
  }
  .tag {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 1px; text-transform: uppercase;
    padding: 3px 8px;
    border: 1px solid rgba(232,255,71,0.2);
    color: rgba(232,255,71,0.7);
  }

  /* PROJECTS GRID */
  .projects-section { background: var(--surface); }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1px;
    background: var(--border);
  }
  .project-card {
    background: var(--surface);
    padding: 36px;
    transition: background 0.3s;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .project-card::after {
    content: ''; position: absolute;
    top: 0; left: 0; width: 3px; bottom: 0;
    background: var(--accent);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.3s;
  }
  .project-card:hover { background: var(--surface2); }
  .project-card:hover::after { transform: scaleY(1); }
  .project-icon {
    font-size: 28px; margin-bottom: 20px;
    display: block;
  }
  .project-name {
    font-family: var(--font-display);
    font-size: 24px; letter-spacing: 1px;
    color: var(--text); margin-bottom: 6px;
    line-height: 1;
  }
  .project-stack {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--accent); letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 16px;
  }
  .project-desc {
    font-size: 14px; line-height: 1.7;
    color: var(--muted); margin-bottom: 24px;
    flex: 1;
  }
  .project-links { display: flex; gap: 16px; }
  .project-link {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 1px; text-transform: uppercase;
    color: var(--muted); text-decoration: none;
    display: flex; align-items: center; gap: 6px;
    transition: color 0.2s;
  }
  .project-link:hover { color: var(--accent); }
  .project-link svg { width: 12px; height: 12px; }

  /* ABOUT / SKILLS */
  .about-section { background: var(--bg); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: start;
  }
  .about-text p {
    font-size: 16px; line-height: 1.8;
    color: var(--muted); margin-bottom: 20px;
  }
  .about-text p strong { color: var(--text); font-weight: 500; }
  .skills-list { display: flex; flex-direction: column; gap: 20px; }
  .skill-row { }
  .skill-header {
    display: flex; justify-content: space-between;
    margin-bottom: 8px;
  }
  .skill-name {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 1px; text-transform: uppercase;
    color: var(--text);
  }
  .skill-cat {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--muted);
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-tag {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.5px;
    padding: 4px 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    color: var(--muted);
    transition: all 0.2s;
  }
  .skill-tag:hover {
    border-color: rgba(232,255,71,0.3);
    color: var(--accent);
    background: rgba(232,255,71,0.04);
  }

  /* CONTACT */
  .contact-section {
    background: var(--surface);
    border-top: 1px solid var(--border);
  }
  .contact-inner {
    display: flex; align-items: center; justify-content: space-between;
    gap: 60px; flex-wrap: wrap;
  }
  .contact-heading {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 80px);
    letter-spacing: 2px; line-height: 0.95;
    color: var(--text);
  }
  .contact-heading span { color: var(--accent); }
  .contact-links {
    display: flex; flex-direction: column; gap: 16px;
    min-width: 260px;
  }
  .contact-item {
    display: flex; align-items: center; gap: 16px;
    padding: 16px 20px;
    border: 1px solid var(--border);
    text-decoration: none;
    color: var(--text);
    transition: border-color 0.2s, background 0.2s;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 1px;
  }
  .contact-item:hover {
    border-color: var(--accent);
    background: rgba(232,255,71,0.03);
    color: var(--accent);
  }
  .contact-icon { font-size: 16px; width: 20px; text-align: center; }

  /* FOOTER */
  footer {
    padding: 32px 48px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--border);
    background: var(--bg);
  }
  footer span {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--muted); letter-spacing: 1px;
  }
  footer a {
    color: var(--accent); text-decoration: none;
  }

  /* SCROLLREVEAL CLASSES */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }

  /* CURSOR DOT */
  .cursor {
    position: fixed; z-index: 9999; pointer-events: none;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, opacity 0.2s;
    mix-blend-mode: difference;
  }
  .cursor.hovering { width: 40px; height: 40px; opacity: 0.4; }

  @media (max-width: 900px) {
    .nav { padding: 16px 24px; }
    .nav-links { display: none; }
    .hero { padding: 100px 24px 80px; }
    .hero-stats { display: none; }
    .section { padding: 70px 24px; }
    .featured-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .contact-inner { flex-direction: column; }
    footer { flex-direction: column; gap: 12px; text-align: center; }
  }
`;

const FEATURED = [
  {
    id: "rocket",
    title: "ROCKET POWER",
    subtitle: "BIGMODE Game Jam 2025",
    badge: "Featured Project Video",
    tags: ["UE5", "C++", "Blueprint", "Team Lead"],
    itchUrl: "https://shrimppa.itch.io/rocket-power",
    embedUrl: "https://www.youtube.com/embed/NALOKTOqgF4",
    thumbText: "🚀",
  },
  {
    id: "starwars",
    title: "STAR WARS RTS",
    subtitle: "Real-Time Strategy — UE5",
    badge: "Featured Project Video",
    tags: ["UE5", "C++", "AI Systems", "Pathfinding"],
    itchUrl: "https://shrimppa.itch.io/star-wars-rts",
    embedUrl: "https://www.youtube.com/embed/27LCIhINr-4",
    thumbText: "⚔️",
  },
];

const PROJECTS = [
  {
    icon: "🚀",
    name: "Rocket Power",
    stack: "UE5 · C++ · Blueprint · Team Lead",
    desc: "Led a team of 5 as sole programmer in a 10-day game jam — coordinated 3D artists, musicians, and animators to design, build, and ship a complete vertical slice under a hard deadline.",
    links: [{ label: "itch.io", href: "https://shrimppa.itch.io/rocket-power" }],
  },
  {
    icon: "⚔️",
    name: "Star Wars RTS",
    stack: "UE5 · C++ · Blueprint · AI Systems",
    desc: "Solo project featuring custom grid-based pathfinding, Newtonian physics, and AI-controlled enemy units with attack and patrol behavior built in Unreal Engine 5.",
    links: [{ label: "itch.io", href: "https://shrimppa.itch.io/star-wars-rts" }],
  },
  {
    icon: "🎮",
    name: "3D Sidescroller",
    stack: "UE5 · C++ · Blueprint",
    desc: "Led a team of 3 to build a fully playable 3D sidescroller from scratch — featuring physics, enemy AI, collectibles, and level progression built in Unreal Engine 5.",
    links: [{ label: "GitHub", href: "https://github.com/torgill43/teamGame" }],
  },
  {
    icon: "📨",
    name: "Community Messaging Tool",
    stack: "Python · Google API · SQLite",
    desc: "A $0-operating-cost bulk messaging tool for sending texts and emails via Google's API. Packaged as a standalone .exe with a GUI for non-technical users — comparable in scope to commercial tools like Twilio.",
    links: [{ label: "GitHub", href: "https://github.com/Shrimppa/Texts_and_Emails_for_Free" }],
  },
  {
    icon: "⚙️",
    name: "2D Physics Simulator",
    stack: "C# · MonoGame · OOP",
    desc: "Built a real-time 2D physics engine from scratch with collision detection, velocity and force modeling, and interactive user controls. A deep dive into polymorphism and inheritance.",
    links: [{ label: "GitHub", href: "https://github.com/Shrimppa/MyGame" }],
  },
];

const SKILLS = [
  { cat: "Languages", tags: ["C++", "C#", "JavaScript", "Python", "SQL", "HTML/CSS", "Erlang", "Clojure"] },
  { cat: "Frontend", tags: ["React", "Next.js", "Jest", "HTML/CSS", "Responsive Design"] },
  { cat: "Game Dev", tags: ["Unreal Engine 5", "Blueprint", "3D Modeling", "Animation", "AI Systems"] },
  { cat: "Tools", tags: ["Git/GitHub", "Docker", "AWS", "Azure", "Jira", "VS Code", "JetBrains Rider"] },
  { cat: "Methods", tags: ["Agile/SCRUM", "TDD", "Code Review", "Team Leadership"] },
];

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const frag = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_clicks[8];
      uniform float u_click_times[8];
      uniform int u_click_count;

      #define PI 3.14159265358979

      // Hexagonal grid — returns (cell center, fractional offset)
      vec4 hexGrid(vec2 uv, float scale) {
        uv *= scale;
        vec2 r = vec2(1.0, 1.732050808); // 1, sqrt(3)
        vec2 h = r * 0.5;
        vec2 a = mod(uv, r) - h;
        vec2 b = mod(uv - h, r) - h;
        vec2 gv = dot(a,a) < dot(b,b) ? a : b;
        float dist = length(gv);
        float edge = smoothstep(0.48, 0.45, dist);
        return vec4(gv, dist, edge);
      }

      float ripple(vec2 uv, vec2 center, float t) {
        float dist = length(uv - center);
        float wave = sin(dist * 28.0 - t * 6.0) * exp(-dist * 4.0) * exp(-t * 1.2);
        return wave;
      }

      vec3 palette(float t) {
        vec3 a = vec3(0.08, 0.10, 0.06);
        vec3 b = vec3(0.05, 0.12, 0.03);
        vec3 c = vec3(0.90, 1.00, 0.30);
        vec3 d = vec3(0.00, 0.25, 0.10);
        return a + b * cos(PI * 2.0 * (c * t + d));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        uv.y = 1.0 - uv.y;
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
        vec2 uvA = uv * aspect;
        vec2 mouseA = u_mouse * aspect;

        // hex grid
        vec4 hex = hexGrid(uvA, 18.0);
        float hexEdge = hex.w;
        float hexDist = hex.z;

        // mouse proximity glow
        float mouseDist = length(uvA - mouseA);
        float mouseGlow = exp(-mouseDist * mouseDist * 6.0);

        // mouse trailing ripple
        float mouseRipple = sin(mouseDist * 40.0 - u_time * 3.0) * exp(-mouseDist * 5.0) * 0.4;

        // click ripples
        float clickWaves = 0.0;
        for (int i = 0; i < 8; i++) {
          if (i >= u_click_count) break;
          float t = u_time - u_click_times[i];
          clickWaves += ripple(uvA, u_clicks[i] * aspect, t) * 0.7;
        }

        // subtle breathing animation on hex cells
        float breath = sin(u_time * 0.5 + hexDist * 3.0) * 0.5 + 0.5;

        float combined = hexEdge * (0.15 + mouseGlow * 0.7 + abs(clickWaves) * 1.4 + breath * 0.05)
                       + mouseRipple * 0.3
                       + clickWaves;

        vec3 col = palette(combined * 0.5 + mouseGlow * 0.3 + abs(clickWaves) * 0.4);
        col += vec3(0.55, 1.0, 0.28) * mouseGlow * 0.3;
        col += vec3(0.55, 1.0, 0.28) * abs(clickWaves) * 0.6;
        col = clamp(col, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uClicks = gl.getUniformLocation(prog, "u_clicks");
    const uClickTimes = gl.getUniformLocation(prog, "u_click_times");
    const uClickCount = gl.getUniformLocation(prog, "u_click_count");

    let mouse = [0.5, 0.5];
    let clicks = [];
    const start = performance.now();

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
    };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect();
      const t = (performance.now() - start) / 1000;
      clicks.push({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, t });
      if (clicks.length > 8) clicks.shift();
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);

    let raf;
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);

      const cx = new Float32Array(16).fill(0);
      const ct = new Float32Array(8).fill(0);
      clicks.forEach((c, i) => { cx[i*2] = c.x; cx[i*2+1] = c.y; ct[i] = c.t; });
      gl.uniform2fv(uClicks, cx);
      gl.uniform1fv(uClickTimes, ct);
      gl.uniform1i(uClickCount, clicks.length);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        display: "block",
        cursor: "crosshair",
        zIndex: 0,
      }}
    />
  );
}

function FeaturedCard({ project }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`featured-card${playing ? " playing" : ""}`}>
      {!playing ? (
        <div style={{
          width: "100%", aspectRatio: "16/9",
          background: `linear-gradient(135deg, #0d1117 0%, #131920 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "80px", overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <span style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 0 40px rgba(232,255,71,0.3))" }}>
            {project.thumbText}
          </span>
        </div>
      ) : (
        <iframe
          className="featured-iframe"
          src={`${project.embedUrl}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={project.title}
        />
      )}
      {!playing && (
        <button className="play-btn" onClick={() => setPlaying(true)} aria-label="Play video">▶</button>
      )}
      <div className="featured-info">
        <div className="featured-badge">{project.badge}</div>
        <div className="featured-title">{project.title}</div>
        <div className="featured-sub">{project.subtitle}</div>
        <div className="featured-tags">
          {project.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, hovering: false });
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => setCursor(c => ({ ...c, x: e.clientX, y: e.clientY }));
    const over = (e) => {
      const featuredCard = e.target.closest(".featured-card");
      if (featuredCard && featuredCard.classList.contains("playing")) {
        setCursor(c => ({ ...c, hovering: false, hidden: true }));
      } else if (e.target.closest("a,button,.project-card,.featured-card")) {
        setCursor(c => ({ ...c, hovering: true, hidden: false }));
      } else {
        setCursor(c => ({ ...c, hovering: false, hidden: false }));
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* Custom cursor */}
      <div className={`cursor${cursor.hovering ? " hovering" : ""}`}
        style={{ 
          left: cursor.x, 
          top: cursor.y,
          opacity: cursor.hidden ? 0 : 1
        }} />

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="nav-logo">TR</a>
        <ul className="nav-links">
          <li><a href="#featured">Projects</a></li>
          <li><a href="#work">More Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero-content" style={{ pointerEvents: "none" }}>
          <div className="hero-tag">Software Engineer &amp; Game Developer</div>
          <h1 className="hero-name">
            TRENTON<br /><span>RINGGER</span>
          </h1>
          <div className="hero-title">CS Graduate · BYU–Idaho</div>
          <p className="hero-desc">
            I build things that run — production web apps, AI integrations, and games
            shipped under pressure. 3.95 GPA, 8 months enterprise experience, and
            a habit of delivering more than expected.
          </p>
          <div className="hero-cta">
            <a href="#featured" className="btn-primary">View Projects →</a>
            <a href="https://github.com/Shrimppa" target="_blank" rel="noreferrer" className="btn-secondary">
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="hero-stats" style={{ pointerEvents: "none" }}>
          <div className="stat">
            <div className="stat-num">35</div>
            <div className="stat-label">Enterprise Features Shipped</div>
          </div>
          <div className="stat">
            <div className="stat-num">11k+</div>
            <div className="stat-label">Lines of Production Code</div>
          </div>
          <div className="stat">
            <div className="stat-num">3.95</div>
            <div className="stat-label">GPA</div>
          </div>
        </div>
      </section>

      {/* FEATURED VIDEO PROJECTS */}
      <section className="section featured" id="featured">
        <div className="section-header reveal">
          <span className="section-num">01</span>
          <h2 className="section-title">FEATURED PROJECTS</h2>
          <div className="section-line" />
        </div>
        <div className="featured-grid reveal">
          {FEATURED.map(p => <FeaturedCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* MORE PROJECTS */}
      <section className="section projects-section" id="work">
        <div className="section-header reveal">
          <span className="section-num">02</span>
          <h2 className="section-title">MORE WORK</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className={`project-card reveal reveal-delay-${(i % 3) + 1}`} key={p.name}>
              <span className="project-icon">{p.icon}</span>
              <div className="project-name">{p.name}</div>
              <div className="project-stack">{p.stack}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-links">
                {p.links.map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="project-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT + SKILLS */}
      <section className="section about-section" id="about">
        <div className="section-header reveal">
          <span className="section-num">03</span>
          <h2 className="section-title">ABOUT</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm a <strong>Computer Science graduate</strong> from Brigham Young University–Idaho
              (Machine Learning emphasis, 3.95 GPA) with a strong background in both
              professional software engineering and independent game development.
            </p>
            <p>
              During my <strong>8-month internship</strong> at The Church of Jesus Christ of Latter-day Saints,
              I shipped 35 features into a production codebase seen by millions of users,
              led a full enterprise migration to AWS, and consistently outperformed expectations
              for a short-term intern.
            </p>
            <p>
              Outside of web development, I spend a lot of time in <strong>Unreal Engine 5</strong> —
              building games, leading small teams under hard deadlines, and exploring what
              interactive experiences can feel like when built with care.
            </p>
            <p>
              I'm based in <strong>Rigby, Idaho</strong> and open to relocation for the right opportunity.
            </p>
            <div style={{ marginTop: "32px" }}>
              <a href="https://linkedin.com/in/trenton-ringger" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: "inline-flex" }}>
                LinkedIn ↗
              </a>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--accent)", marginBottom: "24px", textTransform: "uppercase" }}>
              Tech Stack
            </div>
            <div className="skills-list">
              {SKILLS.map(s => (
                <div className="skill-row" key={s.cat}>
                  <div className="skill-header">
                    <span className="skill-name">{s.cat}</span>
                  </div>
                  <div className="skill-tags">
                    {s.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="contact-inner">
          <div className="reveal">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "2px", marginBottom: "16px" }}>
              — Available for opportunities
            </div>
            <h2 className="contact-heading">
              LET'S<br />BUILD<br /><span>SOMETHING.</span>
            </h2>
          </div>
          <div className="contact-links reveal reveal-delay-2">
            <a href="mailto:trentonringger@gmail.com" className="contact-item">
              <span className="contact-icon">✉</span>
              trentonringger@gmail.com
            </a>
            <a href="https://linkedin.com/in/trenton-ringger" target="_blank" rel="noreferrer" className="contact-item">
              <span className="contact-icon">in</span>
              linkedin.com/in/trenton-ringger
            </a>
            <a href="https://github.com/Shrimppa" target="_blank" rel="noreferrer" className="contact-item">
              <span className="contact-icon">⌥</span>
              github.com/Shrimppa
            </a>
            <a href="https://shrimppa.itch.io" target="_blank" rel="noreferrer" className="contact-item">
              <span className="contact-icon">🎮</span>
              shrimppa.itch.io
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2025 Trenton Ringger</span>
        <span>Built with React · <a href="https://github.com/Shrimppa" target="_blank" rel="noreferrer">View Source</a></span>
      </footer>
    </>
  );
}
