// Charge la navbar depuis navbar.html
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    // Insère la navbar au début du body
    document.body.insertAdjacentHTML('afterbegin', data);
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar:', error));

$(".hover").mouseleave(
    function () {
      $(this).removeClass("hover");
    }
  );
  
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;  // Calcul pour position X
    const y = (e.clientY / window.innerHeight) * 100; // Calcul pour position Y
  
    // Sélectionne la section hero et applique un décalage de fond
    const hero = document.querySelector('.hero');
    hero.style.backgroundPosition = `${x}% ${y}%`;
  });
