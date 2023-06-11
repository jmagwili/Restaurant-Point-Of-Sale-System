document.querySelector(".Click-here").addEventListener('click', function() {
    document.querySelector(".custom-model-main").classList.add('model-open');
  });
  
  document.querySelectorAll(".close-btn, .bg-overlay").forEach(function(element) {
    element.addEventListener('click', function() {
      document.querySelector(".custom-model-main").classList.remove('model-open');
    });
  });
