const slider = tns({
    container: '.carousel__inner',
    slideBy: 'page',
    autoplay: false,
    controls: false,
    speed: 1500,
    nav: false
});
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
  });