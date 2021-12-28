let yt_link = document.querySelector(".input_value");
let btn = document.querySelector(".btn");
let download = document.querySelector(".download");
let title = document.querySelector(".audio_box-title");
let thumbnail = document.querySelector(".thumbnail");

// GET AUDIO BUTTON
function getAudio(data) {
  download.style.visibility = "visible";
  download.href = data.audioURL;
  title.innerText = data.title;
  thumbnail.src = data.thumbnail[2].url;
  length.innerText = data.length;
}

// VALIDATE URL
function matchYoutubeUrl(url) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return true;
  }
  return false;
}

// FETCH JSON DATA
function fetchData(url) {
  fetch(`https://youtubetools.herokuapp.com/audio?youtubeURL=${url}`)
    .then((response) => response.json())
    .then((data) => getAudio(data));
}

// EVENT HANDLER ON CLICK
btn.addEventListener("click", (e) => {
  console.log(yt_link.value);
  e.preventDefault();
  if (yt_link.value.trim().length === 0) {
    alert("Enter Valid Link");
    yt_link.value = "";
  } else if (matchYoutubeUrl(yt_link.value)) {
    fetchData(yt_link.value);
  } else {
    alert("Enter Valid Link");
    yt_link.value = "";
  }
});
