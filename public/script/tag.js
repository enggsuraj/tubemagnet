let input_tag = document.querySelector(".input_tag");
let btn_tag = document.querySelector(".btn_tag");
let tag_box = document.querySelector(".tag_box");
let title_tag = document.querySelector(".title_tag");
let img_tag = document.querySelector(".img_tag");

// GET THUMBNAIL ARRAY
const getTag = (data) => {
  img_tag.src = data.thumbnails[3].url;
  title_tag.innerText = data.title;
  console.log(data);
  if (!data.keywords) {
    tag_box.innerText = "No Keywords Tag present in video";
  } else {
    data.keywords.forEach((element) => {
      let p = document.createElement("p");
      p.innerText = element;
      tag_box.append(p);
    });
  }
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

// FETCH JSON DATA
const fetchTagData = (url) => {
  fetch(`https://youtubetools.herokuapp.com/tagdata?youtubeURL=${url}`)
    .then((response) => response.json())
    .then((data) => getTag(data));
};

// EVENT HANDLER ON CLICK
btn_tag.addEventListener("click", (e) => {
  e.preventDefault();
  tag_box.innerHTML = "";
  if (input_tag.value.trim().length === 0) {
    alert("Enter Valid Link");
    input_tag.value = "";
  } else if (matchYoutubeUrl(input_tag.value)) {
    fetchTagData(input_tag.value);
    input_tag.value = "";
  } else {
    alert("Enter Valid Link");
    input_tag.value = "";
  }
});
