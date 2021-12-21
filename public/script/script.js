let yt_link = document.querySelector(".input_value");
let btn = document.querySelector(".btn");
let download = document.querySelector(".download");
let title = document.querySelector(".audio_box-title");
let thumbnail = document.querySelector(".thumbnail");

function getAudio(data) {
  download.style.visibility = "visible";
  download.href = data.audioURL;
  title.innerText = data.title;
  thumbnail.src = data.thumbnail[2].url;
  yt_link.value = "";
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (yt_link.value.trim().length === 0) {
    alert("Enter Valid Link");
    yt_link.value = "";
  } else {
    fetch(`http://localhost:8000/audio?youtubeURL=${yt_link.value}`)
      .then((response) => response.json())
      .then((data) => getAudio(data));
  }
});
