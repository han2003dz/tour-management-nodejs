document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("images");
  const previewContainer = document.getElementById("image-preview-container");

  input.addEventListener("change", function () {
    const files = this.files;
    previewContainer.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = function () {
        const container = document.createElement("div");
        container.classList.add("img-container");

        const imgElement = document.createElement("img");
        imgElement.src = reader.result;
        imgElement.classList.add("img-thumbnail", "mr-2", "mb-2");

        const iconElement = document.createElement("i");
        iconElement.classList.add(
          "fa-regular",
          "fa-circle-xmark",
          `delete-icon${i}`,
          "btn-delete"
        );

        container.appendChild(imgElement);
        container.appendChild(iconElement);
        previewContainer.appendChild(container);

        document.body.addEventListener("click", (e) => {
          if (e.target.matches(`.delete-icon${i}`)) {
            const imgContainer = e.target.parentNode.parentNode;
            imgContainer.parentNode.removeChild(imgContainer);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  });
});
