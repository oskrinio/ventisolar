(function (Drupal) {
  Drupal.behaviors.menu = {
    attach: (context, settings) => {
      const menu_icon = document.querySelector('.icon');
      const menu_canvas = document.querySelector('.canvas');
      const canvas_icon = document.querySelector('.canvas_icon');

      menu_icon.addEventListener('click', (e)=> {
        if (menu_icon.classList.contains('open')) {
          menu_canvas.classList.remove('close');
          menu_icon.classList.remove('open');
          menu_canvas.classList.add('open');
        }
      });
      canvas_icon.addEventListener('click', (e)=> {
        if (canvas_icon.classList.contains('open')) {
          menu_canvas.classList.remove('open');
          menu_canvas.classList.add('close');
          menu_icon.classList.add('open');
        }
      });
    }
  }
}(Drupal));