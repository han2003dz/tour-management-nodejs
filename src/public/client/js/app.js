const sortOption = () => {
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
};

sortOption();

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const innerSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;
    console.log(input);
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code == 200) {
          const tours = data.tours;
          if (tours.length > 0) {
            const htmls = tours.map((item) => {
              return `
                  <a class="inner-item" href="/tours/detail/${item.slug}">
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