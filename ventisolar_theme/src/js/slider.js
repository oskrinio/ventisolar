import Glide from '@glidejs/glide';

(function ($, Drupal) {
  Drupal.behaviors.slider = {
    attach: (context, settings) => {
      new Glide('.banner-carousel', {
        type: 'carousel',
        gap: 0,
        animationDuration: 1000,
        perView: 1,
        breakpoints: {
          1440: {
            perView: 1,
          },
          1024: {
            perView: 1,
          },
          768: {
            perView: 1,
          },
        },
      }).mount();

      $('.modal-video', context).on('hidden.bs.modal', (e) => {
        const video = $(e.currentTarget).find('iframe');
        const video_url = video.attr('src');
        video.attr('src', '');
        setTimeout(() => {
          video.attr('src', video_url);
        }, 100);
      });
    }
  }
}(jQuery, Drupal));
