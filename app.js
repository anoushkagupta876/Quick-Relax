const app = () =>{
const song = document.querySelector('.song');
const play = document.querySelector('.play');

const outline = document.querySelector('.moving-outline circle');
const timeSelect = document.querySelectorAll('.time-select button');
//sounds
const sounds = document.querySelectorAll('.sound-picker button');

//time
const time = document.querySelector('.time-display');

//get length
const outlineLength = outline.getTotalLength();
console.log(outlineLength);

//duration
let duration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

//play sound
sounds.forEach( sound => {
  sound.addEventListener('click', function(){
song.src = this.getAttribute("data-sound");
checkPlaying(song);

  });
});

play.addEventListener('click', () => {
  checkPlaying(song);
});

//select sound
timeSelect.forEach(option =>{
  option.addEventListener('click', function(){
    duration = this.getAttribute("data-time");
   time.textContent = `${(Math.floor( duration/ 600))}${(Math.floor( (duration / 60) % 10))}:${(Math.floor( ((duration % 60)/10)))}${(Math.floor( (duration % 60) %10))}`;
  });
});

const checkPlaying = (song) =>{
  if(song.paused){
  song.play();
  play.src = "./images/pause.svg";
}
else {
  song.pause();
  play.src = "./images/play.svg";
}

};

//animate circle
song.ontimeupdate = () =>{
  let currentTime = song.currentTime;
  let elapsed =  duration - currentTime;
  let sec = Math.floor(elapsed % 60);
  console.log(sec);
  let min = Math.floor(elapsed / 60);
  console.log(min);
let minf =  Math.floor(min / 10);
let mins = Math.floor(min % 10);
let secf =  Math.floor(sec / 10);
let secs = Math.floor(sec % 10);

let progress = outlineLength - (currentTime/duration)* outlineLength;

outline.style.strokeDashoffset = progress;

time.textContent = `${minf}${mins}:${secf}${secs}`;

if(currentTime >= duration){
  song.pause();
  song.currentTime = 0;
  play.src = "./images/play.svg";
}

};
};

app();