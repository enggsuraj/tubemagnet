import { matchYoutubeUrl } from "./utility/utility.js";

let title = document.querySelector(".audio_box-title");
let yt_link = document.querySelector(".input_value");
let thumbnail = document.querySelector(".thumbnail");
let download = document.querySelector(".download");
let btn = document.querySelector(".btn");

// GET AUDIO BUTTON
const getAudio = (data) => {
  download.style.visibility = "visible";
  download.href = data.audioURL;
  title.innerText = data.title;
  thumbnail.src = data.thumbnail[2].url;
};

// FETCH JSON DATA MP3
const fetchData = (url) => {
  fetch(`http://localhost:3000/audio?youtubeURL=${url}`)
    .then((response) => response.json())
    .then((data) => getAudio(data));
};

// EVENT HANDLER ON CLICK
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (yt_link.value.trim().length === 0) {
    alert("Enter Valid Link");
    yt_link.value = "";
  } else if (matchYoutubeUrl(yt_link.value)) {
    fetchData(yt_link.value);
    yt_link.value = "";
  } else {
    alert("Enter Valid Link");
    yt_link.value = "";
  }
});
