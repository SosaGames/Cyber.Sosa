const room = document.getElementById('room');
const icons = document.querySelectorAll('.icon');
const closeup = document.getElementById('closeup');
const closeupImg = document.getElementById('closeup-img');
const backBtn = document.getElementById('back');

let target = 0;
let current = 0;
const damping = 0.4;

function animation() {
  current += (target - current) * damping;
  room.style.backgroundPositionX = (current * 100) + '%';
  requestAnimationFrame(animation);
}
animation();

function setTargetFromX(x) {
  let percent = x / window.innerWidth;
  percent = Math.max(0, Math.min(1, percent));
  target = percent;
}
window.addEventListener('mousemove', (e) => setTargetFromX(e.clientX));
window.addEventListener('touchmove', (e) => {
  if (e.touches && e.touches[0]) setTargetFromX(e.touches[0].clientX);
}, { passive: true });

const closeups = {
  desk: {
    img: "Desk.png",
    text: "This is where I do all of my work and study a vast amount of technology. This is configured with Dual Boot Windows 11/Arch Linux (I use Arch BTW), where I do CTF's, Program software, virtualize systems with VMware, Game Development, play games(ofc), and more!",
    pins: [
      { x: 76, y: 28, text: "Specs: AMD Ryzen 7 7700X 8-Core Processor, AMD Radeon RX 7600 XT, 2TB M.2 NVMe, 32GB DDR5, B650 GAMING X AX" },
      { x: 43, y: 64, text: "This is Charlie, he often lies under my desk while I work. He says bark" },
      { x: 75, y: 37, text: "My work laptop, working remotely as a compliance specialist working with frameworks like SOC 2 and ISO 27001" }
    ]
  },
  workshop: { img: "workshop.png", text: "I used to tinker on my main desk, but to prevent damage, I built this one! This is where I disassemble and repair a vast amount of electronics, some of the most recent include a PS3 Fat, Wii Remotes, and my brother's Phone!", 
    pins: [
    { x: 35, y: 50, text: "mmmm Pi" },
    { x: 50, y: 68, text: "01000010 01110101 01101001 01101100 01100100 00100000 01101101 01100101 00100000 01100001 01101100 01110010 01100101 01100001 01100100 01111001 00101110 00101110 00101110 00100000"},
    { x: 70, y: 20, text: "Rock Climbing stuff sitting on top of my tool box that houses wires, screws, and tools"},
    { x: 70, y: 68, text: "Next in line for repair and ~Modifications~"}
  ]},
  shelf: { img: "shelf.png", text: "My Beautiful Shelf that houses a lot of the things that detail who I am. I played with Legos as a kid, and I see Legos as the cornerstone in my life that guided me towards tinkering and learning how things work together. Along with that, I have many of my consoles here and some books that I have read/or yet to read!", 
    pins: [
    { x: 30, y: 25, text: "My wonderful Legos" },
    { x: 58, y: 42, text: "Retro collection, will keep forever!!!" },
    { x: 48, y: 69, text: "Audrino UNO and Wii U" }
  ]},
  skillsUSA: { img: "skillsUSA.png", text: "Proudly Representing Gwinnett Technical College, I was blessed with the opportunity to compete in the SkillsUSA State competition, earning the gold medal with my teammate, and long story short.. Nationals went pretty good too :)",
    pins: [
      {x: 40, y: 60, text: "Nationals Gold Medal"},
      {x: 70, y: 75, text: "State Gold Medal"}
    ]},
  certifications: { img: "certifications.png", text: "Some Certifications I've earned in the last few years. I also earned my AAS in Cyber Security and an AAS in Networking Specialist from my school, along with a handful of certifications. I'm eagerly waiting to receive them in the mail to hang them up! In the meantime, I'm studying towards my CCNA, CISSP, and others!"},
  award: { img: "award.png", text: "Was selected Top four finalist in my school for the Georgia Occupational Award of Leadership, Other things I've done in my school include: Awarded Top Student in Cyber Security Program, Student Ambassador/Government, Game Development & Esports Club VP, Gwinnett County Police Citizens Advisory Board Member, SkillsUSA Nationalist, 30+ hours of voulenteering and more!",
    pins: [
      {x: 70, y: 30, text: "Collection of stickers that came from the laptops I've repaired, my favorites are  the Gameboy Advanced SP and Boo"}
    ]},
  justice: { img: "justicecorner.png", text: "I'm not saying I'm Batman... but me and him have never been in the same room together",
    pins: [
      {x: 90, y: 80, text: "Top Student In Cyber Security Program At Gwinnett Technical College Medal"},
      {x: 15, y: 85, text: "GCPCAB, SkillsUSA, and Ambassador Badges"}
      
    ]
   }
};

function renderPins(pins = []) {
  const layer = document.getElementById('pin-layer');
  if (!layer) return;
  layer.innerHTML = ""; 

  pins.forEach(p => {
    const dot = document.createElement('button');
    dot.className = 'pin';
    dot.type = 'button';
    dot.style.left = p.x + '%';
    dot.style.top  = p.y + '%';

    let bubble = null;
    function toggleBubble() {
      if (bubble) { bubble.remove(); bubble = null; return; }
      bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = p.text;
      bubble.style.left = p.x + '%';
      bubble.style.top  = p.y + '%';
      layer.appendChild(bubble);
    }

    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBubble();
    });

    layer.appendChild(dot);
  });

  function closer(e) {
    if (!e.target.closest('.pin')) {
      layer.querySelectorAll('.bubble').forEach(b => b.remove());
      layer.removeEventListener('click', closer);
    }
  }
  layer.addEventListener('click', closer);
}


icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const id = icon.dataset.target;
    const data = closeups[id];
    if (!data) return;
    closeupImg.src = data.img;
    document.getElementById('closeup-text').textContent = data.text;
    closeup.classList.remove('hidden');
    renderPins(data.pins || []);
  });
});

backBtn.addEventListener('click', () => {
  closeup.classList.add('hidden');
  closeupImg.src = "office.png";
  const layer = document.getElementById('pin-layer');
  if (layer) layer.innerHTML = "";
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    const consoleEl = document.getElementById("consoleshell");
    consoleEl.classList.toggle("active");
  }
});

const Playerimg = new Image();
Playerimg.src = "supercomputer.png"; 

const controls = {
  "btn-up": "up",
  "btn-down": "down",
  "btn-left": "left",
  "btn-right": "right",
  "btn-a": "a",
  "btn-b": "b",
  "btn-power": "power"
};

Object.keys(controls).forEach(id => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("mousedown", () => handleInput(controls[id], true));
  btn.addEventListener("mouseup", () => handleInput(controls[id], false));
  btn.addEventListener("touchstart", e => { e.preventDefault(); handleInput(controls[id], true); });
  btn.addEventListener("touchend", e => { e.preventDefault(); handleInput(controls[id], false); });
});

const keys = { b:false, up:false, power:false };

function handleInput(action, pressed) {
  console.log(`Action: ${action}, Pressed: ${pressed}`);
  if (action === 'b')  keys.b = pressed;
  if (action === 'up') keys.up = pressed;
  if (action === 'power' && pressed) {
    if (window.togglePower) window.togglePower();
  }
}


(function () {
  const INTRO_KEY = 'office_intro_seen';
  const overlayEl = document.getElementById('startmenu');
  function hideOverlay() { overlayEl?.classList.add('hidden'); }
  if (localStorage.getItem(INTRO_KEY) === '1') hideOverlay();
  document.addEventListener('click', (e) => {
    const enter = e.target.closest('#startmenu-enter');
    const hide  = e.target.closest('#startmenu-hide');
    if (enter) { e.preventDefault(); hideOverlay(); }
    if (hide)  { e.preventDefault(); localStorage.setItem(INTRO_KEY,'1'); hideOverlay(); }
  });
})();


(function(){
  const cvs = document.getElementById('Game');
  const ctx = cvs?.getContext('2d');
  if (!cvs || !ctx) { console.warn('No canvas #Game found'); return; }

  const STATE = {
    OFF:'OFF', BOOT:'BOOT', LOGO1:'LOGO1', LOGO2:'LOGO2',
    STORY:'STORY', READY:'READY', PLAY:'PLAY', CRASH:'CRASH'
  };

  let game = {
    state: STATE.OFF,
    t: 0,
    score: 0,
    best: +(localStorage.getItem('sosa_best')||0),

  
    px: 50, py: 220, vy: 0, onGround: true,
    floor: 260,


    speed: 1.0,
    obstacles: [],
    stars: []
  };

  const G = 0.45;
  const JUMP_V = -9.6;

  function togglePower(){
    if (game.state === STATE.OFF) boot();
    else powerOff();
  }
  window.togglePower = togglePower;

  function boot(){ resetWorld(); setState(STATE.BOOT); }
  function powerOff(){ setState(STATE.OFF); }
  function resetWorld(){
    game.score = 0;
    game.speed = 2.5;
    game.px = 40; game.py = 220; game.vy = 0; game.onGround = true;
    game.obstacles = []; game.stars = [];
    for (let i=1;i<=3;i++) spawnObstacle(320 + i*250);
  }
  function setState(s){ game.state = s; game.t = 0; }

  function spawnObstacle(x){
    const h = 12 + Math.random()*28;
    const w = 8 + Math.random()*22;
    game.obstacles.push({ x, y: game.floor - h, w, h });
  }
  function aabb(ax,ay,aw,ah,bx,by,bw,bh){
    return ax<bx+bw && ax+aw>bx && ay<by+bh && ay+ah>by;
  }

  window.addEventListener('keydown', (e)=>{
    if (e.code==='KeyZ' || e.code==='ArrowUp') keys.b = true;
    if (e.code==='KeyP') togglePower();
    if (e.code==='KeyR' && game.state===STATE.CRASH) { resetWorld(); setState(STATE.READY); }
  });
  window.addEventListener('keyup', (e)=>{
    if (e.code==='KeyZ' || e.code==='ArrowUp') keys.b = false;
  });
  let last = performance.now();
  function loop(now){
    const dt = now - last; last = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function update(dt){
    game.t += dt;

    switch(game.state){
      case STATE.OFF: return;

      case STATE.BOOT:
        if (game.t > 500) setState(STATE.LOGO1); return;

      case STATE.LOGO1:
        if (game.t > 2000) setState(STATE.LOGO2); return;

      case STATE.LOGO2:
        if (game.t > 3000) setState(STATE.STORY); return;

      case STATE.STORY:
        if (game.t > 3500) setState(STATE.READY); return;

      case STATE.READY:
        if (keys.b){ keys.b = false; setState(STATE.PLAY); }
        return;

      case STATE.PLAY:
        if ((keys.b || keys.up) && game.onGround){
          game.vy = JUMP_V; game.onGround = false;
        }
        game.vy += G;
        game.py += game.vy;
        if (game.py >= game.floor){
          game.py = game.floor; game.vy = 0; game.onGround = true;
        }

        game.speed += 0.0008;
        game.obstacles.forEach(o => o.x -= game.speed);

        if (game.obstacles[0] && game.obstacles[0].x + game.obstacles[0].w < -10){
          game.obstacles.shift(); spawnObstacle(320 + Math.random()*200);
        }
        if (game.stars[0] && game.stars[0].x + 8 < -10){
          game.stars.shift(); spawnStar(340 + Math.random()*240);
        }

        for (const o of game.obstacles){
          if (aabb(game.px-8, game.py-16, 16,16, o.x,o.y,o.w,o.h)){
            setState(STATE.CRASH);
            game.best = Math.max(game.best, Math.floor(game.score));
            localStorage.setItem('sosa_best', game.best);
            return;
          }
        }
        for (const s of game.stars){
          if (!s.hit && aabb(game.px-8, game.py-16, 16,16, s.x-s.r, s.y-s.r, s.r*2, s.r*2)){
            s.hit = true; game.score += 10;
          }
        }
        game.score += 0.08;
        return;

      case STATE.CRASH:
        if (keys.b){ keys.b = false; resetWorld(); setState(STATE.READY); }
        return;
    }
  }

 
  function clear(c){ ctx.fillStyle = c; ctx.fillRect(0,0,cvs.width,cvs.height); }
  function text(t, x, y, size=16, color='#e2e8f0', align='left'){
    ctx.fillStyle = color; ctx.font = `${size}px monospace`; ctx.textAlign = align; ctx.fillText(t, x, y);
  }
  function centerText(lines, size=18, color='#e2e8f0', gap=22){
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.font = `${size}px monospace`;
    const total = (lines.length-1)*gap;
    const startY = (cvs.height/2) - total/2;
    lines.forEach((l,i)=> ctx.fillText(l, cvs.width/2, startY + i*gap));
    ctx.textAlign = 'left';
  }

  function draw(){
    switch(game.state){
      case STATE.OFF:
        clear('#06090f');
        centerText(['Turn me on... please.'], 16, '#6b7280');
        return;

      case STATE.BOOT:
        clear('#0b1016'); centerText(['AGHH'], 16, '#9aa0ff'); return;

      case STATE.LOGO1:
        clear('#0b1016'); centerText(['SOSA STUDIOS'], 28, '#00FF0C'); return;

      case STATE.LOGO2:
        clear('#0b1016'); centerText(['MUSEUM ESCAPE'], 26, '#FFDA00'); return;

      case STATE.STORY:
        clear('#0b1016');
        centerText(["I've escaped the museum…", "I have to run before he catches me."], 12, '#e2e8f0');
        return;

      case STATE.READY:
        clear('#0b1016'); centerText(['He is coming..', '', 'Press B to Start'], 18, '#e2e8f0'); return;

      case STATE.PLAY: {
      
        clear('#ce9090ff');
       
        ctx.fillStyle = '#16426d'; ctx.fillRect(0, game.floor+2, cvs.width, 4);
       
        if (Playerimg && Playerimg.complete) {
          ctx.drawImage(Playerimg, game.px - 15, game.py - 32, 32, 32);
        } else {
          ctx.fillStyle = '#6be675';
          ctx.fillRect(game.px-8, game.py-16, 16,16);
        }
        ctx.fillStyle = '#140808ff'; game.obstacles.forEach(o=> ctx.fillRect(o.x,o.y,o.w,o.h));

        text('Score: ' + Math.floor(game.score), 8, 16, 12, '#000');
        text('Best: '  + game.best, 8, 30, 12, '#000');
        return;
      }

      case STATE.CRASH:
        clear('#0066ff');
        centerText([':( Your server has ran into an obstacle!', '', 'Press B to reboot'], 12, '#ffffff');
        return;
    }
  }
})();

(function fiGameSosa(){
  const shell = document.querySelector('.console-shell');
  const base_w = 1800;
  const base_h = 1000;

  function fit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const horizpad = 20;
    const vertpad = 20;
    const maxW = vw -horizpad * 2;
    const maxH = ch - vertpad * 2;
    const scaale = Math.min(maxW /base_w, maxH / base_h, 1);

    shell.style.setProperty('--scale', scale);
  }
    fit(); 
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
  })();

