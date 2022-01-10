const AudioContext = window.AudioContext || window.webkitAudioContext;

var aContext = null;
var gainNode;
var sound;
var panner;

const shineImg = document.querySelector('#shine-img');
let timeout;

document.addEventListener('click', e => {
  aContext = new AudioContext();
  aElement = document.querySelector('audio');
  gainNode = aContext.createGain();
  gainNode.gain.value = 0.5;
  sound = aContext.createMediaElementSource(aElement);
  panner = new StereoPannerNode(aContext, {pan: 0});
  sound.connect(panner).connect(gainNode).connect(aContext.destination);
}, {once: true});

document.addEventListener('click', e => {
  clearTimeout(timeout);
  shineImg.style.left = e.pageX + 'px';
  shineImg.style.top = e.pageY + 'px';
  shineImg.style.display = 'block';

  timeout = setTimeout(() => {
    shineImg.style.display = 'none';
  }, 150);

  document.body.appendChild(shineImg);

  if(aContext !== null){
    const panPosition = ((e.pageX / window.innerWidth) - 0.5) * 2;
    panner.pan.value = panPosition;
    aElement.play();
    window.navigator.vibrate(100);
  }
});