// THUMBNAIL
let input_thumbnail = document.querySelector(".input_thumbnail");
let btn_thumbnail = document.querySelector(".btn_thumbnail");
let height = document.querySelector(".height");
let width = document.querySelector(".width");
let thumbnail_img = document.querySelector(".thumbnail_img");
let x = document.querySelector(".x");
let heading = document.querySelector(".heading");

let btn_download = document.querySelector(".btn_download");

// GET THUMBNAIL ARRAY
function getThumbnail(data) {
  x.style.visibility = "visible";
  btn_download.style.visibility = "visible";
  height.innerText = data.thumbnails[3].height;
  width.innerText = data.thumbnails[3].width;
  thumbnail_img.src = data.thumbnails[3].url;
  heading.innerText = data.title;
  btn_download.href = data.thumbnails[3].url;
  btn_download.download = data.title;
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
function fetchThumbnailData(url) {
  fetch(`https://youtubetools.herokuapp.com/thumbnaildata?youtubeURL=${url}`)
    .then((response) => response.json())
    .then((data) => getThumbnail(data));
}

// EVENT HANDLER ON CLICK
btn_thumbnail.addEventListener("click", (e) => {
  e.preventDefault();
  if (input_thumbnail.value.trim().length === 0) {
    alert("Enter Valid Link");
    input_thumbnail.value = "";
  } else if (matchYoutubeUrl(input_thumbnail.value)) {
    fetchThumbnailData(input_thumbnail.value);
  } else {
    alert("Enter Valid Link");
    input_thumbnail.value = "";
  }
});
