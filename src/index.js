'use strict'

document.addEventListener( 'DOMContentLoaded', () => {
  // Modal
  let popup = document.getElementById("popup");
  let span = document.getElementsByClassName("close")[0];

  document.querySelector(".modal-show").addEventListener('click', function() {
    popup.style.display = "block";
  });

  // Close the modal
  span.onclick = function() {
    popup.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
  }
});
