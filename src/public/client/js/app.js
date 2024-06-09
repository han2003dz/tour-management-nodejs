const sort = document.querySelector("[sort]");
if (sort) {
  const url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", (e) => {
    // lấy ra value của ô option
    const value = e.target.value;
    // lúc này value đang ở string cần chuyển sang mảng
    const [sortKey, sortValue] = value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });
  // vì mỗi lần chuyển trạng thái web sẽ load lại và set lại về mặc định
  // cần thêm thuộc tính selected=true cho option hiện tại
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  // nếu web đã trả về url có sortKey và sortValue thì:
  if (sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(
      `option[value='${stringSort}']`
    );
    optionSelected.selected = true;
  } else {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
  }

  // nút xóa sắp xếp
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });
}
// End Button sort

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const innerSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code == 200) {
          const tours = data.tours;
          if (tours.length > 0) {
            const htmls = tours.map((item) => {
              return `
                  <a class="inner-item" href="/detail/${item.slug}">
                    <div class="inner-image">
                      <img src="${item.image}" />
                    </div>
                    <div class="inner-info">
                        <div class="inner-title">${item.title}</div>
                        <div class="inner-category">
                          <i class="fa-solid fa-microphone-lines"></i> ${item.infoCategory.title}
                        </div>
                    </div>
                  </a>
                `;
            });
            const innerList = boxSearch.querySelector(".inner-list");
            innerList.innerHTML = htmls.join("");
            innerSuggest.classList.add("show");
            console.log(innerSuggest);
          } else {
            innerSuggest.classList.remove("show");
          }
        }
      });
  });
}

// End Search Suggests

// start show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const buttonClose = document.querySelector("[close-alert]");
  const hideAlert = () => {
    showAlert.classList.add("alert-hidden");
  };
  setTimeout(hideAlert, time);
  if (buttonClose) {
    buttonClose.addEventListener("click", hideAlert);
  }
}

// Pagination

const linkPagination = document.querySelectorAll("[link-pagination");
if (linkPagination) {
  let url = new URL(window.location.href);
  linkPagination.forEach((link) => {
    link.addEventListener("click", () => {
      const page = link.getAttribute("link-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// end pagination
// upload image
const uploadImg = document.querySelector("[upload-image]");
if (uploadImg) {
  const uploadImgInput = document.querySelector("[upload-image-input]");
  const uploadImgPreview = document.querySelector("[upload-image-preview]");
  console.log("OK");

  uploadImgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImgPreview.src = URL.createObjectURL(file);
    }
  });
}

//end upload image

// like a tour
const listBtnLike = document.querySelectorAll("[button-like]");
if (listBtnLike.length > 0) {
  listBtnLike.forEach((btnLike) => {
    btnLike.addEventListener("click", () => {
      const idSong = btnLike.getAttribute("button-like");
      const isActive = btnLike.classList.contains("active");
      const typeLike = isActive ? "dislike" : "like";
      const link = `/api/v1/tours/like/${typeLike}/${idSong}`;
      const optionsMethod = {
        method: "PATCH",
      };
      fetch(link, optionsMethod)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.code == 200) {
            const dataLike = btnLike.querySelector("[data-like]");
            dataLike.innerHTML = `${data.like} like`;
            btnLike.classList.toggle("active");
          }
        });
    });
  });
}
// end like a tour
