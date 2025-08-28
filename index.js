const room = document.getElementById('room');
const icons = document.querySelectorAll('.icon');
const closeup = document.getElementById('closeup');
const closeupImg = document.getElementById('closeup-img');
const backBtn = document.getElementById('back');

let target = 0;
let current = 0;
const damping = .4;

function animation() {
    current += (target - current) * damping; 
    room.style.backgroundPositionX = (current * 100) + '%'
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
}, {passive: true});


const closeups = {
  desk: 
  {
    img: "Desk.png",
    text: "This is the desk where I do all my work, virtualization, studying whatever you could think of, this website was even created here! In my free time I spend a lot of time playing around with various technologies and learning, my goal in life is to learn as much as I can so that I can be a unstoppable all things technology, mwaahhahahaha"
  },

  workshop: 
  {
    img: "workshop.png",
    text: "Origionally I would tinker with hardware on my main desk, so I decided to build this table to be my mini workshop. On this table I've diagnosed, taken apart and repaired various devices including consoles like Wii, Wii U, PS3 Fat, old andriod phones, etc and many more to come."
  },

  shelf: 
  {
    img: "shelf.png",
    text: "My Beautiful Shelf that houses a lof the things that repersent who I am, Various Lego strucutures that became a corner stone in my interst in engineering, Consoles including 3DS XL, Sega Dreamcast and the N64 (not my entire collection just what is displayed!). This Shelf not only houses who I am but side projects including devices I'm fixing and books that I have yet to read! "
  },
  
  skillsUSA: 
  {
    img: "skillsUSA.png",
    text: "On Febuary 20th-22nd of 2025, I was blessed with the oportunity to enter the SkillsUSA State competition of Cybersecurity. Ofcourse, as you can see in the image me and my teammate both secured the gold medal landing us a spot in Nationals. Nationals had various challenge's and a CTF running in the background, it was a tough match with all the states we faced around the country, but we preserved and won the Nationals Gold Medal for SkillsUSA Cyber Security! Even making it into the local paper. This is a frame that my family constructed for me that I have yet to hang on the wall lol. "
  },
  certifications: 
  {
    img: "certifications.png",
    text: "Some certifications I've gained in my time of being in college, I've also earned my assosiates degree in cyber security and an assosiates degree in networking specialist from Gwinnett Techincal colelge, I look forward to hanging those up when I get them! Along with these I'm also in the mits of studying for more certifications in industry including CCNA, Linux+, CISSP, and more!"
  },

  award: 
  {
    img: "award.png",
    text: "Global Occupational Award of Leadership, an award I won for my prepared speach and being one of the top 4 finalist within my school"
  },

  justice: 
  {
    img: "justicecorner.png",
    text: "Uhhhhh I'm not saying I'm batman or anything but me and batman have never been in the same room together...."
  }
};

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const target = icon.dataset.target;
    closeupImg.src = closeups[target].img;
    document.getElementById('closeup-text').textContent = closeups[target].text;
    closeup.classList.remove('hidden');
  });
});

backBtn.addEventListener('click', () => {
  closeup.classList.add('hidden');
  closeupImg.src = "office.png";
});



