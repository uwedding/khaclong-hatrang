// Hàm delay (dùng cho animation)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Tạo curtain container
const BGcurtain = document.createElement("div");
BGcurtain.id = "BGcurtain";

// Panel bên trái
const BGleft = document.createElement("div");
BGleft.className = "BGpanel BGleft";

// Panel bên phải
const BGright = document.createElement("div");
BGright.className = "BGpanel BGright";

// Logo
const BGlogo = document.createElement("div");
BGlogo.className = "BGlogo";
BGlogo.id = "BGlogo";

// Thêm các phần tử vào curtain
BGcurtain.appendChild(BGleft);
BGcurtain.appendChild(BGright);
BGcurtain.appendChild(BGlogo);

// Gắn curtain vào body
document.body.appendChild(BGcurtain);

const BGbody = document.body;
let BGopened = false; // trạng thái cửa

// Hàm mở/đóng curtain
async function handleOpenDoor() {
  BGopened = !BGopened;

  // Toggle class "BGopen" trên curtain
  BGcurtain.classList.toggle("BGopen", BGopened);

  if (BGopened) {
    // Khi mở cửa
    BGlogo.classList.remove("BGlogoPenBorder", "BGlogoPen");
    BGbody.classList.remove("BGlock-scroll");

    // Delay để chạy animation
    await delay(2000);

    // Đặt zIndex xuống thấp (ẩn curtain)
    BGcurtain.style.zIndex = -999;
  } else {
    // Khi đóng cửa
    BGcurtain.style.zIndex = 0x9184e729fff; // rất lớn để luôn nằm trên
    BGbody.classList.add("BGlock-scroll");

    await delay(1000);

    // Hiệu ứng viền logo
    BGlogo.classList.add("BGlogoPenBorder", "BGlogoPen");

    await delay(500);

    // Xóa hiệu ứng border
    BGlogo.classList.remove("BGlogoPenBorder");
  }
}

// Khi load trang thì sau 700ms sẽ tự mở cửa
window.onload = function () {
  setTimeout(() => {
    handleOpenDoor();
  }, 700);
};
