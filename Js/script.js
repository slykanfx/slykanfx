document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------
     NAVBAR ACTIVE LINK + COLOR CHANGE PER SECTION
  ---------------------------------------------------- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar ul a");
  let current = "";

  function updateNavbarHighlight() {
    let activeSectionFound = false;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - 200;     // more accurate highlight
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      if (id) current = id;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLinks[index]) navLinks[index].classList.add("active");

        // COLOR RULES
        let color = "#ffffff";
        if (id === "profile" ) color = "#41ae9f";
        if (id === "about") color = "#A6F6F1";
        if ( id === "home") color = "#ff0000";
        if ( id === "contact") color = "#a0a0a0";

        navLinks.forEach((link) => (link.style.color = color));
        if (navLinks[index]) navLinks[index].style.color = "#ffffff";

        activeSectionFound = true;
      }
    });

    if (!activeSectionFound) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.href.includes(current)) link.classList.add("active");
      });
    }
  }

  window.addEventListener("scroll", updateNavbarHighlight);
  updateNavbarHighlight();



 /* ----------------------------------------------------
   POPUP FORM
---------------------------------------------------- */

const hireBtn = document.getElementById("hire-me-btn");
const hireForm = document.getElementById("hire-form");
const formOverlay = document.getElementById("form-overlay");
const closeBtn = document.getElementById("close-btn");

const popupFormElement =
document.getElementById("popupFormElement");

const popupMessage =
document.getElementById("popupMessage");

const nameError =
document.getElementById("nameError");

const emailError =
document.getElementById("emailError");

const workError =
document.getElementById("workError");

const messageError =
document.getElementById("messageError");


/* ----------------------------------------------------
   OPEN FORM
---------------------------------------------------- */

hireBtn.addEventListener("click", () => {

  hireForm.style.display = "block";

  formOverlay.style.display = "block";

  popupMessage.style.display = "none";

  popupFormElement.style.display = "block";

  popupFormElement.reset();

  clearErrors();
});


/* ----------------------------------------------------
   CLOSE FORM
---------------------------------------------------- */

function closeForm() {

  hireForm.style.display = "none";

  formOverlay.style.display = "none";
}

closeBtn.addEventListener("click", closeForm);

formOverlay.addEventListener("click", closeForm);


/* ----------------------------------------------------
   SUBMIT FORM
---------------------------------------------------- */

popupFormElement.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    clearErrors();

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const work =
    document.getElementById("work").value.trim();

    const message =
    document.getElementById("message").value.trim();

    let hasError = false;

    /* VALIDATION */

    if (!name) {

      nameError.textContent =
      "Enter your name";

      hasError = true;
    }

    if (!email) {

      emailError.textContent =
      "Enter your email";

      hasError = true;
    }

    if (!work) {

      workError.textContent =
      "Enter project type";

      hasError = true;
    }

    if (!message) {

      messageError.textContent =
      "Enter your message";

      hasError = true;
    }

    if (hasError) return;

    try {

      /* ----------------------------------------
         WEB3FORMS EMAIL
      ---------------------------------------- */

      const formData = new FormData(
        popupFormElement
      );

      await fetch(
        "https://api.web3forms.com/submit",
        {

          method: "POST",

          body: formData
        }
      );


      /* ----------------------------------------
         DISCORD API
      ---------------------------------------- */

      await fetch("/api/contact", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          name,
          email,
          work,
          message

        })
      });


      /* ----------------------------------------
         SUCCESS
      ---------------------------------------- */

      popupFormElement.style.display =
      "none";

      popupMessage.style.display =
      "block";

      popupMessage.innerHTML =
      "Your response has been submitted successfully.";

      popupFormElement.reset();

      setTimeout(() => {

        closeForm();

        popupFormElement.style.display =
        "block";

        popupMessage.style.display =
        "none";

      }, 2500);

    } catch (error) {

      console.error(error);

      popupMessage.style.display =
      "block";

      popupMessage.innerHTML =
      "Something went wrong.";

    }
  }
);


/* ----------------------------------------------------
   CLEAR ERRORS
---------------------------------------------------- */

function clearErrors() {

  nameError.textContent = "";

  emailError.textContent = "";

  workError.textContent = "";

  messageError.textContent = "";
}



  /* ----------------------------------------------------
     SWIPER GALLERY (SAFE INIT)
  ---------------------------------------------------- */
  if (window.Swiper && document.querySelector(".mySwiper")) {
    if (!document.querySelector(".swiper-initialized")) {
      new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 2,
          slideShadows: false
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: false
      });
    }
  }




/* Video modal */
const modal = document.getElementById('videoModal');
const frame = document.getElementById('videoFrame');
const closeBotn = document.getElementById('closeModal');

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    frame.src = card.dataset.video + '?autoplay=1&rel=0&modestbranding=1';
    modal.classList.add('active');
  });
});

function closeModal(){
  modal.classList.remove('active');
  frame.src = '';
}

closeBotn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });



/* Video modal */
document.querySelectorAll('.xard').forEach(xard => {
  xard.addEventListener('click', () => {
    frame.src = xard.dataset.video + '?autoplay=1&rel=0&modestbranding=1';
    modal.classList.add('active');
  });
});

function closeModal(){
  modal.classList.remove('active');
  frame.src = '';
}

closeBotn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });




  /* ----------------------------------------------------
     CENTER SCROLL CIRCLE + TOP PROGRESS BAR
  ---------------------------------------------------- */
  // -----------------------
  // Defensive selectors: support either id or class for circle/track/progress.
  const scrollCircle = document.getElementById('scroll-circle') || document.querySelector('.scroll-circle');
  const scrollTrack = document.getElementById('scroll-track') || document.querySelector('.scroll-track');
  const progressBar = document.getElementById('scroll-progress') || document.querySelector('.scroll-progress');

  // If neither circle nor progress exists, skip this section silently.
  if (scrollCircle || progressBar) {
    const pageSections = document.querySelectorAll('.hero, section');

    // update top progress bar
    function updateProgressBar() {
      if (!progressBar) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    // section-based index (discrete)
    function calcSectionIndex() {
      let index = 0;
      pageSections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) index = i;
      });
      return index;
    }

    // continuous target Y (maps full document)
    function computeContinuousTarget() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const maxY = Math.max(0, window.innerHeight - 100);
      return progress * maxY + 500;
    }

    // section-based target Y (maps discrete sections)
    function computeSectionTarget() {
      const index = calcSectionIndex();
      const total = Math.max(1, pageSections.length - 0);
      const progress = index / total;
      const maxY = Math.max(0, window.innerHeight - -400);
      return progress * maxY - 1290;
    }

    // Smooth animation using requestAnimationFrame — this avoids depending solely on scroll events
    let currentTop = parseFloat(getComputedStyle(scrollCircle).top) || 30;
    let rafId = null;
    function animateCircle() {
      if (!scrollCircle) return;

      // pick a blended target: primarily section-based but also influenced by continuous scroll
      const sectionTarget = computeSectionTarget();
      const continuousTarget = computeContinuousTarget();
      // blend them (tweak weights if needed)
      const target = sectionTarget * -0.8 + continuousTarget * 0.12;

      // lerp towards target
      currentTop = currentTop + (target - currentTop) * 0.16;
      scrollCircle.style.top = currentTop + 'px';

      // request next frame
      rafId = requestAnimationFrame(animateCircle);
    }

    // Start animation loop
    animateCircle();

    // Update progress bar and immediate recalculation on scroll/resize
    const onFastUpdate = () => {
      updateProgressBar();
      // also immediately nudge currentTop if page resized to avoid jump
      currentTop = parseFloat(getComputedStyle(scrollCircle).top) || currentTop;
    };

    window.addEventListener('scroll', onFastUpdate, { passive: true });
    window.addEventListener('resize', onFastUpdate);

    // Cleanup if needed (optional)
    window.addEventListener('beforeunload', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });

    // initial call
    onFastUpdate();
  } // end if circle/progress exists
}); // DOMContentLoaded end



const sentence = "FX ARTIST";

/* Exact mapping */

const noteMap = {

    "F": {name:"Sa",  freq:240},
    "X": {name:"Re",  freq:270},
    "A": {name:"Ga",  freq:300},
    "R": {name:"Ma",  freq:320},
    "T": {name:"Pa",  freq:360},
    "I": {name:"Dha", freq:400},
    "S": {name:"Ni",  freq:450}

};

/* Last T becomes upper Sa */

let tCounter = 0;

const symbols = [
    "♪",
    "♫",
    "♬",
    "✦",
    "✧",
    "❈"
];

const container =
    document.getElementById("musicText");

const audioContext =
    new (window.AudioContext || window.webkitAudioContext)();

/* Windy flute-like tone */

function playSargam(freq){

    const osc =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    const filter =
        audioContext.createBiquadFilter();

    osc.type = "sine";

    osc.frequency.value = freq;

    filter.type = "lowpass";
    filter.frequency.value = 1100;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.09,
        audioContext.currentTime + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 1.4
    );

    osc.start();

    osc.stop(audioContext.currentTime + 1.4);
}

/* Floating particles */

function createParticles(x,y){

    for(let i=0;i<8;i++){

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.innerHTML =
            symbols[Math.floor(
                Math.random()*symbols.length
            )];

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.setProperty(
            "--x",
            Math.random()
        );

        document.body.appendChild(particle);

        setTimeout(()=>{
            particle.remove();
        },2000);
    }
}

/* Note label */

function showNote(element,name){

    const label =
        document.createElement("div");

    label.classList.add("note-label");

    label.innerText = name;

    element.appendChild(label);

    setTimeout(()=>{
        label.remove();
    },1000);
}

/* Generate text */

sentence.split("").forEach((char)=>{

    if(char === " "){

        const space =
            document.createElement("div");

        space.classList.add("space");

        container.appendChild(space);

        return;
    }

    const span =
        document.createElement("span");

    span.classList.add("letter");

    span.textContent = char;

    /* Detect second T */

    let currentNote;

    if(char === "T"){

        tCounter++;

        if(tCounter === 1){

            currentNote = {
                name:"Pa",
                freq:360
            };

        } else {

            currentNote = {
                name:"Sa'",
                freq:480
            };
        }

    } else {

        currentNote = noteMap[char];
    }

    span.addEventListener("mouseenter",(e)=>{

        playSargam(currentNote.freq);

        createParticles(
            e.clientX,
            e.clientY
        );

        showNote(
            span,
            currentNote.name
        );
    });

    container.appendChild(span);
});



/*--------------------------------------------------------------------------------------------------------



const form =
document.querySelector("form");

form.addEventListener("submit", async (e)=>{

  

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const work =
    document.getElementById("work").value;

    const message =
    document.getElementById("message").value;

    await fetch(
    "https://discordapp.com/api/webhooks/1502302670797537401/xtMd3i4vQVSKmvZdiqqMjTQjXRzjXccLMHR1A7vodO_cZg2gQgQhUi0O2C1WH5oOUm5H",
    {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            content:
`🚨 NEW PROJECT REQUEST 🚨

Name: ${name}

Email: ${email}

Work: ${work}

Message:
${message}`

        })
    });

    alert("Message Sent");

});


/*--------------------------------------------------------------------------------------------------------*/



const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));


const isTV = window.matchMedia("(min-width: 1920px)");
const isDesktop = window.matchMedia("(min-width: 1024px)");
const isTablet = window.matchMedia("(max-width: 1023px)");
const isMobile = window.matchMedia("(max-width: 767px)");
const isSmallMobile = window.matchMedia("(max-width: 374px)");
