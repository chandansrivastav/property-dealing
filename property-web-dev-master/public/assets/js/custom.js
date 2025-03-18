$(document).ready(function () {
  $(".mob-menu").click(function () {
    $(this).toggleClass("active-menu");
    $(".navigation").slideToggle();
  });
});

$(".menu-links a").click(function () {
  if ($(window).width() < 768) {
    if ($(this).next().css("display") == "block") {
    } else {
      $(".menu-links a").next().slideUp();
    }
    $(this).next().slideToggle();
  }
});

// video loop

const video = document.getElementById("bannerVideo");
// Desired loop duration in seconds
const desiredLoopTime = 1; // e.g., 5 seconds

video.addEventListener("timeupdate", function () {
  if (video.currentTime >= desiredLoopTime) {
    video.currentTime = 0; // Restart the video
    video.play(); // Ensure the video continues playing
  }
});
