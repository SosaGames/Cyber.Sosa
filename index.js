const room = document.getElementById('room');
let target = 0;

window.addEventListener('mousemove', (e) => {
    let percent = e.clientX / window.innerWidth;
 
    percent = Math.max(0, Math.min(1, percent));

    target = percent;
    
room.style.backgroundPositionX = (target * 100) + '%';
});

window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    const percent = t.clientX / window.innerWidth;
    target = percent; 
    room.style.backgroundPositionX = (target * 100) + '%';
}, {passive: true});
