const imageSources = [
  "assets/trail.jpg",
  "assets/lakesunset.jpg",
  "assets/cabin.jpg",
  "assets/doe.jpg",
  "assets/starrynight.jpg",
];

function addThumbnail(imageSource) {
  const thumbnail = document.createElement("img");
  
  thumbnail.src = imageSource;
  thumbnail.classList.add("thumbnail");
  
  document.getElementById("thumbnail-container").appendChild(thumbnail);
  
  thumbnail.onclick = () => {
    document.getElementById("fullsize-image").src = imageSource;
    document.getElementById("image-container").classList.remove('hidden');
  }
}

function addAllThumbnails() {
  imageSources.forEach(imageSource => {
  
      addThumbnail(imageSource);
    });
}

addAllThumbnails();

document.getElementById("fullsize-image").src = imageSources[0];
document.getElementById("image-container").classList.remove('hidden');

