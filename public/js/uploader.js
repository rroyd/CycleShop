const input = document.querySelector("#files");
const preview = document.querySelector(".preview");

input.style.opacity = 1;

input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  
    const curFiles = input.files;
    console.log("Hello")
    if (curFiles.length === 0) {
      const para = document.createElement("p");
      para.textContent = "No files currently selected for upload";
      preview.appendChild(para);
    } else {
      const list = document.createElement("ul");
      preview.appendChild(list);
        
      for (const file of curFiles) {
        const listItem = document.createElement("li");
        const para = document.createElement("p");
        
        para.textContent = `${file.name}, ${returnFileSize(
            file.size,
          )}.`;
          const image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.alt = image.title = file.name;
  
          listItem.appendChild(image);
          listItem.appendChild(para);

        list.appendChild(listItem);
      }
    }
  }
  

  function returnFileSize(number) {
    if (number < 1e3) {
      return `${number} bytes`;
    } else if (number >= 1e3 && number < 1e6) {
      return `${(number / 1e3).toFixed(1)} KB`;
    } else {
      return `${(number / 1e6).toFixed(1)} MB`;
    }
  }