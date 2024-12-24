const input = document.querySelector("#profilePicture");
const displayImage = document.querySelector("#file")

input.style.opacity = 1;

input.addEventListener("change", displayProfilePicture);

function displayProfilePicture() {
    const uploadedPhoto = input.files[0];

    displayImage.src = URL.createObjectURL(uploadedPhoto);
  }
  