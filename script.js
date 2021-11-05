const AudioContext = window.AudioContext || window.webkitAudioContext;

const aContext = new AudioContext();
const aElement = document.querySelector('audio');
const sound = aContext.createMediaElementSource(aElement);
const panner = new StereoPannerNode(aContext, {pan: 0});
sound.connect(panner).connect(aContext.destination);


const shineImg = document.querySelector('#shine-img');
let timeout;

document.addEventListener('click', e => {
  clearTimeout(timeout);
  shineImg.style.left = e.pageX + 'px';
  shineImg.style.top = e.pageY + 'px';
  shineImg.style.display = 'block';

  timeout = setTimeout(() => {
    shineImg.style.display = 'none';
  }, 150);

  document.body.appendChild(shineImg);

  const panPosition = ((e.pageX / window.innerWidth) - 0.5) * 2;
  panner.pan.value = panPosition;
  aElement.play();
});