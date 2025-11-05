// Chặn user F12
// document.addEventListener("keydown", function (e) {
//   // F12
//   if (e.key === "F12" || e.keyCode === 123) {
//     e.preventDefault();
//     return false;
//   }

//   // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U or Ctrl+S
//   if (
//     (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
//     (e.ctrlKey && (e.key === "U" || e.key === "S"))
//   ) {
//     e.preventDefault();
//     return false;
//   }
// });

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

// Lưu form vào GG sheet

const GOOGLE_SCRIPT_URL_THAM_DU =
  "https://script.google.com/macros/s/AKfycbx2Iy_9Vl5fGSH39qIyzPZh4-E4soV_qACmnl_WojkeSaBZ2jp55Z8fXUmG8i2x5Xk/exec";
document
  .querySelector("#form-loi-chuc-1")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("SECTION20").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const form = e.target; // Lấy form để reset sau này
    const formData = new FormData(form);
    let selected_form_6 = formData.getAll("form_item6");
    let selected_form_8 = formData.getAll("form_item8");
    let selected_form_12 = formData.getAll("form_item12");

    const data = {
      name: "'" + form.name.value,
      attend: "'" + selected_form_6.join(", "), // Xác nhận tham dự
      guest: "'" + selected_form_8.join(", "), // Khách của ai
      wishVisibility: "'" + selected_form_12.join(", "), // Ai sẽ thấy lời chúc của bạn?
      numGuests: "'" + form.form_item13.value, // Số lượng người tham dự
      message: "'" + form.message.value,
    };

    fetch(GOOGLE_SCRIPT_URL_THAM_DU, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json()) // Nếu Apps Script trả về JSON
      .then((res) => form.reset()); // Reset form sau khi gửi;
  });

// Hiển thị notification
//     <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

// <style>
//     /* Custom Toastify Styles */
//     .toast-content {
//         display: flex;
//         align-items: center;
//         gap: 12px;
//     }

//     .toast-icon {
//         font-size: 24px;
//         flex-shrink: 0;
//     }

//     .toast-text {
//         flex: 1;
//     }

//     .toast-title {
//         font-weight: bold;
//         margin-bottom: 4px;
//         font-size: 16px;
//     }

//     .toast-message {
//         font-size: 14px;
//         line-height: 1.4;
//     }
// </style>

// const sheetIDLoiChuc = "1rYRmehUFeo19pNqES1SollC5dq79749ZCF1YgjY9HIw";
// const urlLoiChuc = `https://docs.google.com/spreadsheets/d/${sheetIDLoiChuc}/gviz/tq?tqx=out:json`;

// let messages = []; // Chuyển sang `let`

// // Cấu hình
// const config = {
//   displayDuration: 7000,
//   intervalTime: 7000,
// };

// let autoInterval;

// // Tạo toast notification
// function createToast(messageData) {
//   const toastContent = `
//         <div class="toast-content">
//             <div class="toast-icon">
//                 <img src="https://w.ladicdn.com/source/notify.svg?v=1.0" alt="Icon" />
//             </div>
//             <div class="toast-text">
//                 <div class="toast-title">${messageData["Tên"]}</div>
//                 <div class="toast-message">${messageData["Lời Chúc"]}</div>
//                 <div class="toast-message">${messageData["Mối quan hệ"]}</div>
//             </div>
//         </div>
//     `;

//   Toastify({
//     text: toastContent,
//     duration: config.displayDuration,
//     gravity: "top",
//     position: "center",
//     stopOnFocus: true,
//     style: {
//       background: "white",
//       color: "#333",
//       borderRadius: "12px",
//       padding: "20px",
//       minWidth: "350px",
//       maxWidth: "400px",
//       width: "80%",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//       fontSize: "14px",
//     },
//     escapeMarkup: false,
//   }).showToast();
// }

// // Hiển thị toast ngẫu nhiên
// function showRandomToast() {
//   if (!messages.length) return;
//   const randomIndex = Math.floor(Math.random() * messages.length);
//   const messageData = messages[randomIndex];
//   createToast(messageData);
//   // showLottieSequence(messageData["Quà tặng"]);
// }

// // Bắt đầu auto show
// function startAutoShow() {
//   showRandomToast();
//   autoInterval = setInterval(showRandomToast, config.intervalTime);
//   console.log("🚀 Auto notification đã bắt đầu");
// }

// Load dữ liệu từ Google Sheets
// async function fetchMessages() {
//   try {
//     const res = await fetch(urlLoiChuc);
//     const data = await res.text();
//     const json = JSON.parse(data.substring(47).slice(0, -2));
//     const rows = json.table.rows.map((row) =>
//       row.c.map((cell) => cell?.v || "")
//     );
//     const headers = rows[0];

//     messages = rows.slice(1).map((row) => {
//       let obj = {};
//       headers.forEach((key, i) => {
//         obj[key] = row[i];
//       });
//       return obj;
//     });

//     const getMessage = messages.filter(msg => msg['Ai thấy lời chúc'] === 'Mọi người');
//     const container = document.getElementById("MessageBox");

//     console.log('getMessage', getMessage);

//     getMessage.map(msg => {
//       // Tạo khung chứa message item
//       const item = document.createElement("div");
//       item.classList.add("MessageBox-item");

//       // Tên (h2)
//       const name = document.createElement("h2");
//       name.classList.add("MessageBox-item-name");
//       name.appendChild(document.createTextNode(msg['Tên']));

//       // Nội dung message (p)
//       const message = document.createElement("p");
//       message.classList.add("MessageBox-item-message");
//       message.appendChild(document.createTextNode(msg['Lời chúc']));

//       // Gắn vào item
//       item.append(name, message);

//       // Thêm vào container
//       container.appendChild(item);
//     })

//     // startAutoShow(); // ✅ Chỉ gọi khi đã có dữ liệu
//   } catch (err) {
//     console.error("❌ Lỗi khi lấy dữ liệu:", err);
//   }
// }

// // Khởi tạo khi load trang
// window.addEventListener("load", () => {
//   console.log("🎉 Trang đã load xong");
//   fetchMessages(); // Gọi hàm load dữ liệu
// });

// window.addEventListener('DOMContentLoaded', function () {
//   // Lấy tham số name từ URL
//   const params = new URLSearchParams(window.location.search);
//   const name = params.get('name');
//   // Hiển thị vào div PARAGRAPH94 nếu có giá trị
//   if (name) {
//     const el = document.querySelector('#PARAGRAPH444 .ladi-paragraph');
//     if (el) el.textContent = name;
//   }
// });
