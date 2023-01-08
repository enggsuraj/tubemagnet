// THUMBNAIL
let input_thumbnail = document.querySelector(".input_thumbnail");
let btn_thumbnail = document.querySelector(".btn_thumbnail");
let thumbnail_img = document.querySelector(".thumbnail_img");
let heading = document.querySelector(".heading");
let thumbnail_box = document.querySelector(".thumbnail_box");

// GET THUMBNAIL ARRAY
const getThumbnail = (data) => {
  heading.innerText = data.title;
  data.thumbnails.forEach((element) => {
    console.log(element);

    let thumbnail_container = document.createElement("div");
    thumbnail_container.classList.add("thumbnail_container");
    let thumbnail_img = document.createElement("img");
    thumbnail_img.classList.add("thumbnail_img");
    thumbnail_img.src = element.url;
    let size = document.createElement("div");
    size.classList.add("thumbnail_size");
    size.innerText = `${element.width}x${element.height}`;
    thumbnail_container.append(thumbnail_img);
    thumbnail_container.append(size);
    thumbnail_box.append(thumbnail_container);
  });
  btn_thumbnail.disabled = false;
  btn_thumbnail.innerHTML = `<h4>Find thumbnail</h4>`;
};

// VALIDATE URL
const matchYoutubeUrl = (url) => {
  let p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return true;
  }
  return false;
};

// FETCH JSON DATA FROM RENDER
const fetchThumbnailData = (url) => {
  fetch(
    `https://youtube-tools-1btk.onrender.com/thumbnaildata?youtubeURL=${url}`
  )
    .then((response) => response.json())
    .then((data) => getThumbnail(data));
};

// EVENT HANDLER ON CLICK
btn_thumbnail.addEventListener("click", (e) => {
  e.preventDefault();
  thumbnail_box.innerHTML = "";
  if (input_thumbnail.value.trim().length === 0) {
    alert("Enter Valid Link");
    input_thumbnail.value = "";
  } else if (matchYoutubeUrl(input_thumbnail.value)) {
    btn_thumbnail.disabled = true;
    btn_thumbnail.innerHTML = `<h4>Wait Loading  Data...</h4>`;
    fetchThumbnailData(input_thumbnail.value);
    input_thumbnail.value = "";
  } else {
    alert("Enter Valid Link");
    input_thumbnail.value = "";
  }
});
