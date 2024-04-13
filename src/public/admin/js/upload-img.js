// document.addEventListener("DOMContentLoaded", function () {
//   const input = document.getElementById("images");
//   const previewContainer = document.getElementById("image-preview-container");
//   if (input) {
//     input.addEventListener("change", function () {
//       const files = this.files;
//       previewContainer.innerHTML = "";
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const reader = new FileReader();
//         reader.onload = function () {
//           const container = document.createElement("div");
//           container.classList.add("img-container");

//           const imgElement = document.createElement("img");
//           imgElement.src = reader.result;
//           imgElement.classList.add("img-thumbnail", "mr-2", "mb-2");

//           const iconElement = document.createElement("i");
//           iconElement.classList.add(
//             "fa-regular",
//             "fa-circle-xmark",
//             `delete-icon${i}`,
//             "btn-delete"
//           );

//           container.appendChild(imgElement);
//           container.appendChild(iconElement);
//           previewContainer.appendChild(container);

//           document.body.addEventListener("click", (e) => {
//             if (e.target.matches(`.delete-icon${i}`)) {
//               const imgContainer = e.target.parentNode.parentNode;
//               imgContainer.parentNode.removeChild(imgContainer);
//             }
//           });
//         };
//         reader.readAsDataURL(file);
//       }
//     });
//   }
// });

function deleteImage(event, index) {
  event.preventDefault();
  var container = event.target.parentElement;
  container.remove();
}

// upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
  console.log(uploadImagePreview.src);
}
//end upload image
