/* =========================================================
   MAE JANE PORTFOLIO — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });
}


/* =========================================================
   PORTFOLIO FILTER
   ========================================================= */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((button) => {
  button.addEventListener("click", () => {

    const category = button.dataset.filter;

    /* Update active button */
    filters.forEach((filter) => {
      filter.classList.remove("active");
      filter.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    /* Filter projects */
    projects.forEach((project) => {

      const projectCategory = project.dataset.category;

      const shouldShow =
        category === "all" ||
        projectCategory === category;

      if (shouldShow) {
        project.style.display = "";
        project.classList.remove("project-hidden");

        requestAnimationFrame(() => {
          project.classList.add("project-visible");
        });

      } else {
        project.classList.remove("project-visible");
        project.classList.add("project-hidden");

        setTimeout(() => {
          if (project.classList.contains("project-hidden")) {
            project.style.display = "none";
          }
        }, 180);
      }
    });

    /* Stop videos when switching category */
    document.querySelectorAll(".portfolio-video").forEach((video) => {
      video.pause();
    });
  });
});


/* =========================================================
   VIDEO PORTFOLIO
   ========================================================= */

const portfolioVideos = document.querySelectorAll(".portfolio-video");

portfolioVideos.forEach((video) => {

  const visual = video.closest(".video-visual");

  if (!visual) return;


  /* -----------------------------------------
     Create play overlay
     ----------------------------------------- */

  const playButton = document.createElement("button");

  playButton.className = "video-play-button";
  playButton.type = "button";
  playButton.setAttribute("aria-label", "Play video");

  playButton.innerHTML = `
    <span class="play-symbol">▶</span>
  `;

  visual.appendChild(playButton);


  /* -----------------------------------------
     Play overlay click
     ----------------------------------------- */

  playButton.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (video.paused) {
      pauseOtherVideos(video);
      video.play();
    } else {
      video.pause();
    }

  });


  /* -----------------------------------------
     Video click
     ----------------------------------------- */

  video.addEventListener("play", () => {

    pauseOtherVideos(video);

    visual.classList.add("is-playing");

    playButton.setAttribute("aria-label", "Pause video");

  });


  video.addEventListener("pause", () => {

    visual.classList.remove("is-playing");

    playButton.setAttribute("aria-label", "Play video");

  });


  /* -----------------------------------------
     Video ended
     ----------------------------------------- */

  video.addEventListener("ended", () => {

    visual.classList.remove("is-playing");

    playButton.setAttribute("aria-label", "Replay video");

  });


  /* -----------------------------------------
     Double click = fullscreen
     ----------------------------------------- */

  video.addEventListener("dblclick", () => {

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }

  });

});


/* =========================================================
   PAUSE OTHER VIDEOS
   ========================================================= */

function pauseOtherVideos(currentVideo) {

  portfolioVideos.forEach((video) => {

    if (video !== currentVideo) {
      video.pause();
    }

  });

}


/* =========================================================
   VIDEO MODAL
   ========================================================= */

const modal = document.createElement("div");

modal.className = "video-modal";

modal.innerHTML = `
  <div class="video-modal-backdrop"></div>

  <div class="video-modal-content">

    <button
      class="video-modal-close"
      type="button"
      aria-label="Close video"
    >
      ×
    </button>

    <video
      class="video-modal-player"
      controls
      playsinline
      preload="metadata"
    ></video>

  </div>
`;

document.body.appendChild(modal);

const modalPlayer = modal.querySelector(".video-modal-player");
const modalClose = modal.querySelector(".video-modal-close");
const modalBackdrop = modal.querySelector(".video-modal-backdrop");


/* =========================================================
   OPEN MODAL
   ========================================================= */

portfolioVideos.forEach((video) => {

  const visual = video.closest(".video-visual");

  if (!visual) return;

  visual.addEventListener("dblclick", () => {

    const source = video.querySelector("source");

    if (!source) return;

    modalPlayer.src = source.src;

    modal.classList.add("active");

    document.body.classList.add("modal-open");

    modalPlayer.currentTime = 0;

    modalPlayer.play().catch(() => {});

  });

});


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeVideoModal() {

  modalPlayer.pause();

  modalPlayer.removeAttribute("src");
  modalPlayer.load();

  modal.classList.remove("active");

  document.body.classList.remove("modal-open");

}


modalClose.addEventListener("click", closeVideoModal);

modalBackdrop.addEventListener("click", closeVideoModal);


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeVideoModal();
  }

});


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
