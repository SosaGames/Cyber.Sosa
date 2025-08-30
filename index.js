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
  desk: { img: "Desk.png", text: "This is the desk where I do all my work, virtualization, studying whatever you could think of, this website was even created here! In my free time I spend a lot of time playing around with various technologies and learning, my goal in life is to learn as much as I can so that I can be a unstoppable all things technology, mwaahhahahaha" ,
    pins: [
      {x:3, y:4, text: "doggie"},
    ]
  },
  workshop: { img: "workshop.png", text: "Origionally I would tinker with hardware on my main desk, so I decided to build this table to be my mini workshop. On this table I've diagnosed, taken apart and repaired various devices including consoles like Wii, Wii U, PS3 Fat, old andriod phones, etc and many more to come." },
  shelf: { img: "shelf.png", text: "My Beautiful Shelf that houses a lof the things that repersent who I am, Various Lego strucutures that became a corner stone in my interst in engineering, Consoles including 3DS XL, Sega Dreamcast and the N64 (not my entire collection just what is displayed!). This Shelf not only houses who I am but side projects including devices I'm fixing and books that I have yet to read! " },
  skillsUSA: { img: "skillsUSA.png", text: "On Febuary 20th-22nd of 2025, I was blessed with the oportunity to enter the SkillsUSA State competition of Cybersecurity. Ofcourse, as you can see in the image me and my teammate both secured the gold medal landing us a spot in Nationals. Nationals had various challenge's and a CTF running in the background, it was a tough match with all the states we faced around the country, but we preserved and won the Nationals Gold Medal for SkillsUSA Cyber Security! Even making it into the local paper. This is a frame that my family constructed for me that I have yet to hang on the wall lol. " },
  certifications: { img: "certifications.png", text: "Some certifications I've gained in my time of being in college, I've also earned my assosiates degree in cyber security and an assosiates degree in networking specialist from Gwinnett Techincal colelge, I look forward to hanging those up when I get them! Along with these I'm also in the mits of studying for more certifications in industry including CCNA, Linux+, CISSP, and more!" },
  award: { img: "award.png", text: "Global Occupational Award of Leadership, an award I won for my prepared speach and being one of the top 4 finalist within my school" },
  justice: { img: "justicecorner.png", text: "Uhhhhh I'm not saying I'm batman or anything but me and batman have never been in the same room together...." }
};

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const id = icon.dataset.target;
    const data = closeups[id];
    if (!data) return;
    closeupImg.src = data.img;
    document.getElementById('closeup-text').textContent = data.text;
    closeup.classList.remove('hidden');
  });
});

backBtn.addEventListener('click', () => {
  closeup.classList.add('hidden');
  closeupImg.src = "office.png";
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    const consoleEl = document.getElementById("consoleshell");
    consoleEl.classList.toggle("active");
  }
});


const Playerimg = new Image();
Playerimg.src="supercomputer.png";

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

  function hideOverlay() {
    overlayEl?.classList.add('hidden');
  }

  if (localStorage.getItem(INTRO_KEY) === '1') hideOverlay();

  document.addEventListener('click', (e) => {
    const enter = e.target.closest('#startmenu-enter');
    const hide  = e.target.closest('#startmenu-hide');
    if (enter) { e.preventDefault(); hideOverlay(); }
    if (hide)  { e.preventDefault(); localStorage.setItem(INTRO_KEY, '1'); hideOverlay(); }
  });
})();


(function(){
  const cvs = document.getElementById('Game');
  const ctx = cvs?.getContext('2d');
  if (!cvs || !ctx) { console.warn('No canvas #Game found'); return; }

  
  const STATE = {
    OFF:'OFF',
    BOOT:'BOOT',
    LOGO1:'LOGO1',  
    LOGO2:'LOGO2',   
    STORY:'STORY',   
    READY:'READY',   
    PLAY:'PLAY',
    CRASH:'CRASH'
  };

  let game = {
    state: STATE.OFF,
    t: 0,
    score: 0,
    best: +(localStorage.getItem('sosa_best')||0),
    px: 50, py: 220, vy: 0, onGround: true,
    floor: 260,
    speed: 2.0,
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
    game.speed = 3.0;
    game.px = 40; game.py = 220; game.vy = 0; game.onGround = true;
    game.obstacles = []; game.stars = [];
    for (let i=1;i<=3;i++) spawnObstacle(320 + i*220);
    for (let i=1;i<=2;i++) spawnStar(280 + i*240);
  }
  function setState(s){ game.state = s; game.t = 0; }

  function spawnObstacle(x){
    const h = 18 + Math.random()*28;
    const w = 12 + Math.random()*22;
    game.obstacles.push({ x, y: game.floor - h, w, h });
  }
  function spawnStar(x){
    const y = 120 + Math.random()*60;
    game.stars.push({ x, y, r: 6, hit: false });
  }
  function aabb(ax,ay,aw,ah,bx,by,bw,bh){
    return ax<bx+bw && ax+aw>bx && ay<by+bh && ay+ah>by;
  }

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
        if (game.t > 300) setState(STATE.LOGO1);
        return;

      case STATE.LOGO1:
        if (game.t > 3000) setState(STATE.LOGO2);
        return;

      case STATE.LOGO2:
        if (game.t > 3000) setState(STATE.STORY);
        return;

      case STATE.STORY:
        if (game.t > 3500) setState(STATE.READY);
        return;

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
        game.stars.forEach(s => s.x -= game.speed);

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
        clear('#0b1016'); centerText(['sosa studios'], 28, '#00FF0C'); return;

      case STATE.LOGO2:
        clear('#0b1016'); centerText(['MUSEUM ESCAPE'], 26, '#FFDA00'); return;

      case STATE.STORY:
        clear('#0b1016');
        centerText(["I've escaped the museum…", "I have to run before he catches me."], 10, '#e2e8f0');
        return;

      case STATE.READY:
        clear('#0b1016'); centerText(['He is coming..', '', 'Press B to Start'], 18, '#e2e8f0'); return;

      case STATE.PLAY:
      case STATE.CRASH:
        clear('#923838ff');
  
        ctx.fillStyle = '#16426dff'; ctx.fillRect(0, game.floor+2, cvs.width, 4);
        ctx.drawImage(Playerimg, game.px - 15, game.py - 32, 32, 32);
   
        ctx.fillStyle = '#9aa0ff'; game.obstacles.forEach(o=> ctx.fillRect(o.x,o.y,o.w,o.h));
  
        text('Score: ' + Math.floor(game.score), 8, 16, 12, '#000000ff');
        text('Best: '  + game.best, 8, 30, 12, '#000000ff');

        if (game.state===STATE.CRASH){

          clear('#0066ffff')
          centerText([':( Your server has ran into an obstacle!', '', 'Press B to reboot'], 12, '#ffffffff');
        }
        return;
    }
  }
})();


