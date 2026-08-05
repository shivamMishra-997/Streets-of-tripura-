// ----- Hamburger toggle -----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu(){
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('show');
}
function toggleMenu(){
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  navOverlay.classList.toggle('show');
}
hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', closeMenu);
});
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navA.forEach(a=>a.classList.remove('active'));
      const active = document.querySelector('.nav-link[href="#'+entry.target.id+'"]');
      if(active) active.classList.add('active');
    }
  });
}, {rootMargin:'-45% 0px -50% 0px'});
sections.forEach(sec=>observer.observe(sec));

// ----- Members: data -----
// MEMBERS DATA: replace each entry with real member info.
// "photo" = profile picture URL (square image recommended, 400px+).
// "name"  = member name.
// "role"  = short tag shown on card front (e.g. "Street & Portrait").
// "about" = short bio shown on back of card.
// "insta" = full Instagram profile URL.
const members = [
  {photo:'no-pro.jpg', name:'Kaushik Deb', role:'Founder / Street', about:'Shoots the Battala market every Sunday for six years straight. Believes the best frame is the one you almost missed.', insta:'https://www.instagram.com/ich_bin_kaushik/'},
  {photo:'no-pro.jpg', name:'Ruhit Debnath', role:'Monsoon / Documentary', about:'Documents Agartala\'s monsoon season on expired film. Runs the community\'s print-exchange nights.', insta:'https://www.instagram.com/iamruhit01/'},
  {photo:'no-pro.jpg', name:'Ritwik Debroy', role:'Street / Portrait', about:'A decade of shooting Garia festival without ever asking a subject to pose. Mentors new members on the Sunday walk.', insta:'https://www.instagram.com/atomictale/'},
  {photo:'no-pro.jpg', name:'Sajib Bowmik', role:'Portraits / Editor', about:'Edits the Magazine section and shoots quiet portraits in Udaipur\'s tea stalls.', insta:'https://www.instagram.com/_sajib.bhowmik_/'},
  {photo:'no-pro.jpg', name:'papiya Debnath', role:'Portraits / Editor', about:'Edits the Magazine section and shoots quiet portraits in Udaipur\'s tea stalls.', insta:'https://www.instagram.com/pixelflame_/'},
  {photo:'no-pro.jpg', name:'Hriday Adhikari', role:'Portraits / Editor', about:'Edits the Magazine section and shoots quiet portraits in Udaipur\'s tea stalls.', insta:'https://www.instagram.com/hridayadhikari.jpg/'}

  // Add more members by copying an entry above and editing photo / name / role / about / insta.
];

const membersGrid = document.getElementById('membersGrid');
function renderMembers(list){
  membersGrid.innerHTML = '';
  list.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front">
          <div class="member-photo"><img src="${m.photo}" alt="${m.name}" loading="lazy"></div>
          <div class="member-name">
            <h3>${m.name}</h3>
            <span>${m.role}</span>
          </div>
          <span class="flip-hint">Click to flip</span>
        </div>
        <div class="flip-back">
          <p>${m.about}</p>
          <a href="${m.insta}" class="member-insta" target="_blank" rel="noopener" onclick="event.stopPropagation()">Instagram →</a>
        </div>
      </div>`;
    // Click anywhere on card (except the Instagram link) toggles flip
    card.addEventListener('click', ()=>{
      card.classList.toggle('flipped');
    });
    membersGrid.appendChild(card);
  });
}
renderMembers(members);

// ----- Gallery: photo data -----
const photos = [
  {src:'asset/G1.jpeg', tag:'01A', cat:'Market Life', who:'R. Debbarma'},
  {src:'asset/G2.jpeg', tag:'02A', cat:'Monsoon', who:'S. Nath'},
  {src:'asset/G3.jpeg', tag:'03A', cat:'Portraits', who:'T. Debbarma'},
  {src:'asset/G4.jpeg', tag:'04A', cat:'Festivals', who:'P. Chakma'},
  {src:'asset/G5.jpeg', tag:'05A', cat:'Market Life', who:'A. Das'},
  {src:'asset/G6.jpeg', tag:'06A', cat:'Monsoon', who:'M. Roy'},
  {src:'asset/G7.jpeg', tag:'07A', cat:'Portraits', who:'K. Jamatia'},
  {src:'asset/G8.jpeg', tag:'08A', cat:'Festivals', who:'R. Debbarma'},
  {src:'asset/G9.jpeg', tag:'09A', cat:'Market Life', who:'S. Nath'}
];

const sheet = document.getElementById('contactSheet');
function renderFrames(list){
  sheet.innerHTML = '';
  list.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'frame';
    div.dataset.cat = p.cat;
    div.innerHTML = `
      <img src="${p.src}" alt="${p.cat} street photograph by ${p.who}" loading="lazy">
      <span class="frame-tag">${p.tag}</span>
      <a class="frame-download" href="${p.src}" download="streets-of-tripura-${p.tag}.jpg" title="Download photo" onclick="event.stopPropagation()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
      </a>
      <div class="frame-overlay">
        <div>
          <p>${p.cat}</p>
          <p class="credit">${p.who}</p>
        </div>
      </div>`;
    sheet.appendChild(div);
  });
}
renderFrames(photos);

// ----- Gallery filters -----
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.textContent.trim();
    if(cat === 'All Frames'){
      renderFrames(photos);
    } else {
      renderFrames(photos.filter(p=>p.cat === cat));
    }
  });
});

// ----- Contact form -----
// LINK/BACKEND: this is currently a front-end-only demo (no data is actually sent anywhere).
// To make it functional, either:
//   1) Replace this handler with a fetch() call to your backend/API endpoint, or
//   2) Swap the <form> in index.html to use a service like Formspree/Netlify Forms
//      by setting the form's action="YOUR_FORM_ENDPOINT_URL" and method="POST",
//      and removing the e.preventDefault() below.
const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  sendBtn.textContent = 'Sending...';
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response=>{
    if(response.ok){
      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.style.background = 'var(--red)';
      sendBtn.style.color = 'var(--white)';
      form.reset();
    } else {
      sendBtn.textContent = 'Error — Try Again';
      sendBtn.style.background = 'var(--grey)';
    }
  }).catch(()=>{
    sendBtn.textContent = 'Error — Try Again';
    sendBtn.style.background = 'var(--grey)';
  }).finally(()=>{
    setTimeout(()=>{
      sendBtn.textContent = 'Send Message';
      sendBtn.style.background = 'var(--yellow)';
      sendBtn.style.color = 'var(--black)';
    }, 2500);
  });
});
