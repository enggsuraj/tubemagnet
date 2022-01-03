// THUMBNAIL
let input_thumbnail = document.querySelector(".input_thumbnail");
let btn_thumbnail = document.querySelector(".btn_thumbnail");
let height = document.querySelector(".height");
let width = document.querySelector(".wid th");
let thumbnail_img = document.querySelector(".thumbnail_img");
let x = document.querySelector(".x");
let heading = document.querySelector(".heading");
let thumbnail_box = document.querySelector(".thumbnail_box");

// GET THUMBNAIL ARRAY
function getThumbnail(data) {
  heading.innerText = data.title;
  data.thumbnails.forEach((element) => {
    let thumbnail_container = document.createElement("div");
    thumbnail_container.classList.add("thumbnail_container");
    let thumbnail_img = document.createElement("img");
    thumbnail_img.classList.add("thumbnail_img");
    thumbnail_img.src = element.url;
    thumbnail_container.append(thumbnail_img);
    thumbnail_box.append(thumbnail_container);
  });
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
