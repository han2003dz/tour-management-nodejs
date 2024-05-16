document.addEventListener("DOMContentLoaded", function () {
  const images = document.getElementById("images");
  if (images) {
    images.addEventListener("change", function (event) {
      const files = event.target.files;
      const previewDiv = document.getElementById("image-preview-container");
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add("preview-img");
          const closeButton = document.createElement("i");
          closeButton.innerHTML =
            '<span class="fa-regular fa-circle-xmark"></span>';
          closeButton.classList.add("close", "btn-delete");
          closeButton.addEventListener("click", function () {
            const parentDiv = this.parentElement;
            previewDiv.removeChild(parentDiv);
          });
          const div = document.createElement("div");
          div.appendChild(closeButton);
          div.appendChild(img);
          previewDiv.appendChild(div);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const listBtnDelete = document.querySelectorAll(".btn-data");
  if (listBtnDelete.length > 0) {
    listBtnDelete.forEach((btn) => {
      btn.addEventListener("click", function () {
        const parentDiv = this.parentElement;
        parentDiv.remove();
      });
    });
  }
});
