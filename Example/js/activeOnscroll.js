(function() {
  // get all the btns in the navbar
  const navButtons = document.querySelectorAll('.active-scroll li a');

  // will hold the ids and positions
  let positions = [];

  const addActive = function(id) {
    // clear actives
    navButtons.forEach(a => a.parentNode.classList.remove('active'));

    // add active class
    document
      .querySelector(`a[href='#${id}']`)
      .parentNode.classList.add('active');
  };

  navButtons.forEach(function(navButton) {
    // extracting the ids from each navButton
    const id = navButton.href.split('#')[1];

    const pageSection = document.querySelector(`#${id}`);

    positions.push({
      id: pageSection.id,
      offsetTop: pageSection.offsetTop,
    });
  });

  positions.sort((a, b) => b.offsetTop - a.offsetTop);

  activeOnScroll = function() {
    for (let i = 0; i < positions.length; i++) {
      if (window.scrollY > positions[i].offsetTop) {
        addActive(positions[i].id);
        break;
      }
    }
  };

  window.addEventListener('scroll', throttle(activeOnScroll, 50));

  function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  }
})();
