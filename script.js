// ===============================
// ICON INIT
// ===============================
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

// ===============================
// DROPDOWN MENU
// ===============================
const avatar = document.getElementById("avatar");
const menu = document.getElementById("menu");

if (avatar && menu) {
  avatar.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!avatar.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
}

// ===============================
// MOBILE INPUT (ONLY NUMBERS)
// ===============================
const mobileInput = document.getElementById("mobile");

if (mobileInput) {
  mobileInput.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "");
    if (v.length > 10) v = v.slice(0, 10);
    this.value = v;
  });
}

// VERIFY NUMBER (generate OTP once)
function verifyNumber() {
  let mobile = document.getElementById("mobile").value;

  mobile = mobile.replace(/\D/g, "");

  if (mobile.length !== 10) {
    alert("Enter valid 10-digit mobile number");
    return;
  }

  // ✅ ONLY store mobile
  localStorage.setItem("mobile", mobile);

  // ❌ NO OTP HERE

  // redirect
  window.location.href = "otp.html";
}
// CHECK OTP
function checkOTP() {
  const entered = document.getElementById("otpInput").value;
  const real = localStorage.getItem("otp");

  if (entered === real) {
    alert("Login Successful");
    const mobile =
localStorage.getItem("mobile");

localStorage.setItem(
"userMobile",
mobile
);
    window.location.href = "home.html";
  } else {
    alert("Wrong OTP ❌");
  }
}

// LOGOUT

function logout() {
  localStorage.clear();
  alert("Logged out");
  window.location.href = "index.html";
}

// ===============================
// ACTIVE CARD SWITCH
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const actions = document.querySelectorAll(".action");

  actions.forEach((card) => {
    card.addEventListener("click", () => {
      actions.forEach(c => c.classList.remove("active-card"));
      card.classList.add("active-card");
    });
  });
});
let balanceVisible = false;
let balance = 5000;
let totalCredit = 0;
let totalDebit = 0;

// ===============================
// OPEN PIN POPUP
// ===============================
function openPinPopup() {
  document.getElementById("pinPopup").style.display = "block";
}

// ===============================
// PIN BALANCE CONTROL
// ===============================
let isUnlocked = false;

function toggleBalancePin() {
  if (!isUnlocked) {
    openPinPopup();
  } else {
    hideBalancePin();
  }
}

function hideBalancePin() {
  const balance = document.getElementById("balance");
  const eye = document.querySelector(".eye");

  balance.innerText = "● ● ● ● ● ●";
  eye.className = "ri-eye-line eye";

  isUnlocked = false;
}

function openPinPopup() {
  const popup = document.getElementById("pinPopup");
  popup.style.display = "flex";   // 🔥 important
}
window.onload = () => {
  const balance = document.getElementById("balance");
  const eye = document.querySelector(".eye");

  if (balance && eye) {
    // always start hidden
    balance.innerText = "● ● ● ● ● ●";
    eye.className = "ri-eye-line eye";
  }

  isUnlocked = false;
  
};
// ===============================
// PAYMENT FLOW
// ===============================

let currentMobile = "";
let currentAmount = "";
let currentName = "";
// OPEN PAY POPUP

function openPayPopup(){

  document.getElementById("nameInput").value = "";
  document.getElementById("mobileInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("messageInput").value = "";

  document.getElementById("paymentError").style.display =
  "none";

  document.getElementById("payPopup").style.display =
  "flex";
}


// CLOSE PAY POPUP

function closePayPopup(){

  document.getElementById("payPopup").style.display =
  "none";
}


// SEND PAYMENT

function sendPayment(){
  const name =
  document.getElementById("nameInput").value.trim();

  const mobile =
  document.getElementById("mobileInput").value.trim();

  const amount =
  document.getElementById("amountInput").value.trim();

  const error =
  document.getElementById("paymentError");

  // validation

  if(name === "" || mobile === "" || amount === ""){

    error.style.display = "block";

    error.innerText =
    "Please fill all required fields";

    return;
  }
 
  if(mobile.length !== 10){

    error.style.display = "block";

    error.innerText =
    "Enter valid 10 digit mobile number";

    return;
  }
  currentName = name;
  currentMobile = mobile;
  currentAmount = amount;

  document.getElementById("payPopup").style.display =
  "none";

  document.getElementById("bio-popup").style.display =
  "flex";
}


// AUTHENTICATE PAYMENT

function authenticate(){
  // =========================
// CHECK BALANCE SCAN
// =========================

if(window.checkingBalance){

  document.getElementById("bio-popup").style.display =
  "none";

document.getElementById("popupBalance").innerText =
"₹" + balance.toLocaleString();

  document.getElementById("balancePopup").style.display =
  "flex";
  

  window.checkingBalance = false;

  return;
}
 if(window.balanceMode){

  document.getElementById("bio-popup").style.display =
  "none";

  const balanceText =
  document.getElementById("balance");

  const eye =
  document.querySelector(".eye");

  // SHOW BALANCE

  balanceText.innerText =
  "₹" + balance.toLocaleString();

  eye.className =
  "ri-eye-off-line eye";

  // AUTO HIDE

  setTimeout(() => {

    balanceText.innerText =
    "● ● ● ● ● ●";

    eye.className =
    "ri-eye-line eye";

  }, 8000);

  window.balanceMode = false;

  return;
}

  document.getElementById("bio-popup").style.display =
  "none";

  const now = new Date();

  const date =
  now.toLocaleDateString("en-IN",{
    day:"numeric",
    month:"short",
    year:"numeric"
  });

  const time =
  now.toLocaleTimeString("en-IN",{
    hour:"2-digit",
    minute:"2-digit"
  });

  const txn =
  "#BP" + Math.floor(Math.random()*999999);

  document.getElementById("receiptAmount").innerText =
  "₹" + currentAmount;

  document.getElementById("receiptUser").innerText =
  "Paid to " + currentMobile;

 document.getElementById("receiverName").innerText =
currentName;
// avatar letters

let initials =
currentName
.split(" ")
.map(word => word[0])
.join("")
.toUpperCase();

document.getElementById("receiverAvatar").innerText =
initials;

  document.getElementById("receiptDate").innerText =
  date;

  document.getElementById("receiptTime").innerText =
  time;

  document.getElementById("transactionId").innerText =
  txn;

  document.getElementById("receiptPopup").style.display =
  "flex";
  saveNotification(
"Payment Sent",
`₹${currentAmount} sent to ${currentName}`
);
  sendMoney(Number(currentAmount));
  addToHistory();
}


// CLOSE BIOMETRIC

function closePopup(){

  document.getElementById("bio-popup").style.display =
  "none";
}


// CLOSE RECEIPT

function closeReceipt(){

  document.getElementById("receiptPopup").style.display =
  "none";
}


// SHARE TO WHATSAPP

function shareWhatsApp(){

  let amount =
  document.getElementById("receiptAmount").innerText;

  let user =
  document.getElementById("receiptUser").innerText;

  let txn =
  document.getElementById("transactionId").innerText;

  let text =
`Bio-Pay Payment Receipt

${user}

Amount: ${amount}

Status: Completed

Transaction ID: ${txn}

Paid Securely via Bio-Pay Fingerprint`;

  let url =
`https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(url,"_blank");
}
// =========================
// SAVE PAYMENT HISTORY
// =========================
function addToHistory(){

let initials =
currentName
.split(" ")
.map(word => word[0])
.join("")
.toUpperCase();

const now = new Date();

const time =
now.toLocaleTimeString("en-IN",{
hour:"2-digit",
minute:"2-digit"
});

const item =
document.createElement("div");

item.className = "activity-item";

item.setAttribute("data-name", currentName);
item.setAttribute("data-mobile", currentMobile);
item.setAttribute("data-amount", currentAmount);
item.setAttribute("data-date",
document.getElementById("receiptDate").innerText);
item.setAttribute("data-time",
document.getElementById("receiptTime").innerText);
item.setAttribute("data-transaction",
document.getElementById("transactionId").innerText);

item.innerHTML = `

<div class="activity-left">

<div class="activity-avatar">
${initials}
</div>

<div class="activity-info">

<h4>${currentName}</h4>

<p>${currentMobile} • ${time}</p>

</div>

</div>

<div class="activity-amount">

<h3>-₹${currentAmount}</h3>

<button class="view-btn"
onclick="viewReceipt(this)">
👁 View
</button>

<button class="delete-btn"
onclick="deleteHistory(this)">
🗑 Delete
</button>
</div>
`;

document.getElementById("activityList").prepend(item);
}

/* delete single */

function deleteHistory(button){

  const item =
  button.closest(".activity-item");

  // GET AMOUNT

  const amountText =
  item.querySelector("h3").innerText;

  // REMOVE -₹

  const amount =
  Number(
    amountText
    .replace("-₹","")
    .replace(",","")
  );

  // REMOVE FROM DEBIT

  totalDebit -= amount;

  if(totalDebit < 0){

    totalDebit = 0;
  }

  // RETURN MONEY TO BALANCE

  balance += amount;

  // UPDATE UI

  updateBalanceUI();

  // REMOVE HISTORY

  item.remove();
}
/* clear all */
function viewReceipt(button){

const item =
button.closest(".activity-item");

const name =
item.getAttribute("data-name");

const mobile =
item.getAttribute("data-mobile");

const amount =
item.getAttribute("data-amount");

const date =
item.getAttribute("data-date");

const time =
item.getAttribute("data-time");

const transaction =
item.getAttribute("data-transaction");

let initials =
name
.split(" ")
.map(word => word[0])
.join("")
.toUpperCase();

document.getElementById("receiptAmount").innerText =
"₹" + amount;

document.getElementById("receiverName").innerText =
name;

document.getElementById("receiptUser").innerText =
mobile;

document.getElementById("receiptDate").innerText =
date;

document.getElementById("receiptTime").innerText =
time;

document.getElementById("transactionId").innerText =
transaction;

document.getElementById("receiverAvatar").innerText =
initials;

document.getElementById("receiptPopup").style.display =
"flex";

}
function clearHistory(){

  document.getElementById("activityList").innerHTML = "";
}

  const item =
  button.closest(".activity-item");

  // get saved data

  const name =
  item.getAttribute("data-name");

  const mobile =
  item.getAttribute("data-mobile");

  const amount =
  item.getAttribute("data-amount");

  const date =
  item.getAttribute("data-date");

  const time =
  item.getAttribute("data-time");

  const transaction =
  item.getAttribute("data-transaction");

  // initials

  let initials =
  name
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // update receipt

  document.getElementById("receiptAmount").innerText =
  "₹" + amount;

  document.getElementById("receiverName").innerText =
  name;

  document.getElementById("receiptUser").innerText =
  mobile;

  document.getElementById("receiptDate").innerText =
  date;

  document.getElementById("receiptTime").innerText =
  time;

  document.getElementById("transactionId").innerText =
  transaction;

  document.getElementById("receiverAvatar").innerText =
  initials;

  // show popup

  document.getElementById("receiptPopup").style.display =
  "flex";

// OPEN BALANCE

function openBalancePopup(){

  document.getElementById("balancePopup").style.display =
  "flex";
}

// CLOSE BALANCE

function closeBalancePopup(){

  document.getElementById("balancePopup").style.display =
  "none";
}
// =========================
// CHECK BALANCE POPUP
// =========================

function openBalancePopup(){

  // open biometric first

  window.checkingBalance = true;

  document.getElementById("bio-popup").style.display =
  "flex";
}

function closeBalancePopup(){

  document.getElementById("balancePopup").style.display =
  "none";
}
function openBalanceBiometric(){

const balanceElement =
document.getElementById("balance");

  const eye =
  document.querySelector(".eye");

  // IF ALREADY VISIBLE -> HIDE

  if(balanceElement.innerText !== "● ● ● ● ● ●"){

   balanceElement.innerText =
    "● ● ● ● ● ●";

    eye.className =
    "ri-eye-line eye";

    return;
    updateBalanceUI();
  }

  // OTHERWISE OPEN BIOMETRIC

  window.balanceMode = true;

  document.getElementById("bio-popup").style.display =
  "flex";
}
// =========================
// OPEN QR
// =========================

function openQRPopup(){

document.getElementById("qrPopup").style.display =
"flex";
let username =
localStorage.getItem("profileName")
|| "User";
let upi =
"kris@biopay";

let initials =
username
.split(" ")
.map(word => word[0])
.join("")
.toUpperCase();
document.getElementById("centerLogo").innerHTML =
`<span style="
font-size:28px;
font-weight:bold;
color:#2563eb;
">
${username.charAt(0).toUpperCase()}
</span>`;

document.getElementById("qrAvatar").innerText =
initials;

document.getElementById("qrName").innerText =
username;

document.getElementById("qrUsername").innerText =
"@" + upi;

document.getElementById("upiId").innerText =
upi;

let qrData =
`upi://pay?pa=${upi}&pn=${username}`;

document.getElementById("realQR").src =
"https://api.qrserver.com/v1/create-qr-code/?size=260x260&data="
+ encodeURIComponent(qrData);
const savedPhoto =
localStorage.getItem("qrPhoto");

if(savedPhoto){

document.getElementById("centerLogo").innerHTML =
`<img src="${savedPhoto}"
style="
width:50px;
height:50px;
border-radius:50%;
object-fit:cover;
opacity:.9;
">`;

}
}
/* CLOSE POPUP */

function closeQRPopup(){

  document.getElementById("qrPopup").style.display =
  "none";
}

// =========================
// COPY UPI
// =========================

function copyUPI(){

  let text =
  document.getElementById("upiId").innerText;

  navigator.clipboard.writeText(text);

  alert("UPI ID Copied");
}

// =========================
// SHARE QR
// =========================

async function shareQR(){

  const qrImage =
  document.getElementById("realQR");

  const response =
  await fetch(qrImage.src);

  const blob =
  await response.blob();

  const file =
  new File(
    [blob],
    "BioPayQR.png",
    { type:"image/png" }
  );

  // native share

  if(navigator.canShare &&
     navigator.canShare({ files:[file] })){

    await navigator.share({

      title:"Bio-Pay QR",

      text:"Scan this QR to pay me",

      files:[file]

    });

  }else{

    alert(
    "QR sharing works on mobile devices/browser."
    );
  }
}
  

/* =========================
CREATE QR CARD
========================= */

async function createQRCard(){

  let username =
  document.getElementById("qrName").innerText;

  let upi =
  document.getElementById("upiId").innerText;

  let qr =
  document.getElementById("realQR").src;

  let initials =
  username
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // CANVAS

  const canvas =
  document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 980;

  const ctx =
  canvas.getContext("2d");

  // BACKGROUND

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(
  0,
  0,
  800,
  980
  );

  // USER LOGO

  const gradient =
  ctx.createLinearGradient(
  0,
  0,
  200,
  200
  );

  gradient.addColorStop(
  0,
  "#2563eb"
  );

  gradient.addColorStop(
  1,
  "#60a5fa"
  );

  // NAME

  ctx.fillStyle =
  "#071a52";

  ctx.font =
  "bold 52px Arial";

  ctx.fillText(
  username,
  400,
  290
  );

  // UPI

  ctx.fillStyle =
  "#64748b";

  ctx.font =
  "36px Arial";

  ctx.fillText(
  "@" + upi,
  400,
  345
  );

  // QR BOX

  ctx.fillStyle =
  "#ffffff";

  roundRect(
  ctx,
  180,
  410,
  440,
  440,
  30,
  true
  );

  ctx.lineWidth = 4;

  ctx.strokeStyle =
  "#dbeafe";

  ctx.stroke();

  // QR IMAGE

  const qrImg =
  new Image();

  qrImg.crossOrigin =
  "anonymous";

  qrImg.src = qr;

  await new Promise(resolve=>{
      qrImg.onload = resolve;
  });

  ctx.drawImage(
  qrImg,
  220,
  450,
  360,
  360
  );

  // CENTER LOGO

  ctx.beginPath();

  ctx.fillStyle =
  "white";

  ctx.shadowColor =
  "rgba(0,0,0,.15)";

  ctx.shadowBlur = 20;

  ctx.arc(
  400,
  630,
  60,
  0,
  Math.PI * 2
  );

  ctx.fill();

  ctx.shadowBlur = 0;

  // CENTER LETTER

  ctx.fillStyle =
  "#2563eb";

  ctx.font =
  "bold 52px Arial";

  ctx.fillText(
  username.charAt(0).toUpperCase(),
  400,
  650
  );
/* BOTTOM TEXT */

ctx.fillStyle =
"#64748b";

ctx.font =
"32px Arial";

ctx.textAlign =
"center";

ctx.fillText(
"Scan to pay with any UPI app",
400,
930
);
return canvas;
}
/* =========================
ROUND RECTANGLE
========================= */

function roundRect(
ctx,
x,
y,
width,
height,
radius,
fill
){

  ctx.beginPath();

  ctx.moveTo(x + radius, y);

  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(
  x + width,
  y,
  x + width,
  y + radius
  );

  ctx.lineTo(
  x + width,
  y + height - radius
  );

  ctx.quadraticCurveTo(
  x + width,
  y + height,
  x + width - radius,
  y + height
  );

  ctx.lineTo(
  x + radius,
  y + height
  );

  ctx.quadraticCurveTo(
  x,
  y + height,
  x,
  y + height - radius
  );

  ctx.lineTo(
  x,
  y + radius
  );

  ctx.quadraticCurveTo(
  x,
  y,
  x + radius,
  y
  );

  ctx.closePath();

  if(fill){
    ctx.fill();
  }
}

/* =========================
SHARE QR
========================= */

async function shareQR(){

  const canvas =
  await createQRCard();

  canvas.toBlob(async function(blob){

    const file =
    new File(
    [blob],
    "BioPayQR.png",
    {type:"image/png"}
    );

    await navigator.share({

      title:"BioPay QR",

      files:[file]

    });

  });
}

/* =========================
DOWNLOAD QR
========================= */

async function downloadQR(){

  const canvas =
  await createQRCard();

  const link =
  document.createElement("a");

  link.download =
  "BioPayQR.png";

  link.href =
  canvas.toDataURL();

  link.click();
}
/* =========================
CUSTOMIZE QR
========================= */

function changeQRColor(){

  let colors = [

    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#f97316",
    "#e11d48"

  ];

  let randomColor =
  colors[Math.floor(
  Math.random() * colors.length
  )];

  document.querySelector(
  ".real-qr-box"
  ).style.borderColor =
  randomColor;

  document.querySelector(
  ".upi-user-logo"
  ).style.background =
  randomColor;
}
/* CUSTOM QR IMAGE */

function uploadQRLogo(event){

const file = event.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

localStorage.setItem(
"qrPhoto",
e.target.result
);

document.getElementById("centerLogo").innerHTML =
`<img src="${e.target.result}"
style="
width:22px;
height:22px;
border-radius:50%;
object-fit:cover;
opacity:.9;
">`;

};

reader.readAsDataURL(file);

}
    // CENTER LOGO

/* UPDATE UI */

function updateBalanceUI(){

document.getElementById(
"balance"
).innerText =
"₹" + balance.toLocaleString();

document.getElementById(
"creditAmount"
).innerText =
"+₹" + totalCredit.toLocaleString();

document.getElementById(
"debitAmount"
).innerText =
"-₹" + totalDebit.toLocaleString();
}

/* RECEIVE PAYMENT */

function receiveMoney(amount){

balance += amount;

totalCredit += amount;

updateBalanceUI();
}

/* SEND PAYMENT */

function sendMoney(amount){

balance -= amount;

totalDebit += amount;

updateBalanceUI();

document.getElementById("balance").innerText =
"● ● ● ● ● ●";

document.querySelector(".eye").className =
"ri-eye-line eye";

}
function openSettings(){

alert("Settings Opening...");

}
function openSettings(){

  alert("Opening Settings & Devices");

}
function openSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "flex";

}

function closeSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "none";

}
/* SETTINGS POPUP */

function openSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "flex";

}

function closeSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "none";

}

/* SETTINGS FUNCTIONS */

function openProfileSettings(){

alert("Opening Profile");

}

function openSecurity(){

alert("Opening Security Center");

}

function openNotifications(){

alert("Opening Payment Alerts");

}

function openAbout(){

alert("Bio-Pay v1.0");

}

function openHelp(){

alert("Opening Help & Support");

}

function signOut(){

alert("Signing Out...");

}

/* DARK MODE */

function toggleDarkMode(){

document.body.classList.toggle(
"dark-mode"
);

}
/* =================================
   PROFILE PAGE
================================= */

function openProfilePage(){

document.getElementById(
"profilePage"
).style.display = "flex";

}

/* =================================
   SECURITY PAGE
================================= */

function openSecurityPage(){

document.getElementById(
"securityPage"
).style.display = "flex";

}

/* =================================
   ALERT PAGE
================================= */

function openAlertsPage(){

document.getElementById(
"alertsPage"
).style.display = "flex";

}

/* =================================
   CLOSE PAGE
================================= */

function closePage(id){

document.getElementById(id)
.style.display = "none";

}
/* =========================
   PROFILE USER DATA
========================= */

window.addEventListener(
"load",
function(){

const savedMobile =
localStorage.getItem(
"userMobile"
);

if(savedMobile){

const mobileText =
document.getElementById(
"profileMobile"
);

if(mobileText){

mobileText.innerText =
savedMobile;
}

}

});
document.addEventListener("DOMContentLoaded", function(){

    const mobile =
    document.getElementById("mobile");

    if(mobile){

        mobile.addEventListener("keydown", function(event){

            if(event.key === "Enter"){

                event.preventDefault();

                verifyNumber();

            }

        });

    }

});
document.addEventListener("DOMContentLoaded", function(){

    const otpInput =
    document.getElementById("otpInput");

    if(otpInput){

        otpInput.addEventListener("keydown", function(event){

            if(event.key === "Enter"){

                event.preventDefault();

                checkOTP();

            }

        });

    }

});
// ==========================
// NOTIFICATION PANEL
// ==========================

function toggleNotifications() {

  const panel =
  document.getElementById("notificationPanel");

  if(panel.style.display === "block"){

    panel.style.display = "none";

  }else{

    panel.style.display = "block";

    panel.style.animation =
    "slideDown .3s ease";
  }
}

// CLOSE WHEN CLICK OUTSIDE

document.addEventListener("click", function(e){

  const panel =
  document.getElementById("notificationPanel");

  const bell =
  document.querySelector(".notification-wrapper");

  if(
    panel &&
    bell &&
    !panel.contains(e.target) &&
    !bell.contains(e.target)
  ){

    panel.style.display = "none";
  }

});

// ==========================
// SAVE NOTIFICATION
// ==========================

function saveNotification(title,message){

  let notifications =
  JSON.parse(
  localStorage.getItem("notifications")
  ) || [];

  notifications.unshift({

    title:title,

    message:message,

    time:new Date().toLocaleString()

  });

  localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
  );

  loadNotifications();
}

// ==========================
// LOAD NOTIFICATIONS
// ==========================

function loadNotifications(){

  const list =
  document.getElementById("notificationList");

  const count =
  document.getElementById("notificationCount");

  if(!list) return;

  let notifications =
  JSON.parse(
  localStorage.getItem("notifications")
  ) || [];

  list.innerHTML = "";

  count.innerText =
  notifications.length;

  notifications.forEach((n,index)=>{

    const div =
    document.createElement("div");

    div.className =
    "notification-item";

  div.innerHTML = `

<div class="notify-top">

  <div class="notify-icon">
    <i class="ri-check-double-line"></i>
  </div>

  <div class="notify-content">

    <h4>${n.title}</h4>

    <p>${n.message}</p>

    <small>${n.time}</small>

  </div>

</div>

<button class="delete-btn"
onclick="event.stopPropagation(); deleteNotification(${index})">

🗑 Delete

</button>

`;
    // OPEN FULL DETAILS

    div.onclick = function(){

      showNotificationDetails(n);

    };

    list.appendChild(div);

  });

}

// ==========================
// SHOW DETAILS
// ==========================

function showNotificationDetails(n){

  document.getElementById("detailTitle").innerText =
  n.title;

  document.getElementById("detailMessage").innerHTML = `

    <div style="padding:15px">

      <h2 style="color:#16a34a">
      ✔ Notification Details
      </h2>

      <hr><br>

      <p>${n.message}</p>

      <br>

      <p>
      <b>Time:</b>
      ${n.time}
      </p>

      <p>
      <b>Status:</b>
      Success
      </p>

    </div>

  `;

  document.getElementById("notificationPopup").style.display =
  "flex";
}

// ==========================
// CLOSE DETAILS
// ==========================

function closeNotificationPopup(){

  document.getElementById("notificationPopup").style.display =
  "none";
}

// ==========================
// DELETE ONE
// ==========================

function deleteNotification(index){

  let notifications =
  JSON.parse(
  localStorage.getItem("notifications")
  ) || [];

  notifications.splice(index,1);

  localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
  );

  loadNotifications();
}

// ==========================
// CLEAR ALL
// ==========================

function clearNotifications(){

  localStorage.removeItem(
  "notifications"
  );

  loadNotifications();
}

// ==========================
// PAGE LOAD
// ==========================

window.addEventListener("load", function(){

  loadNotifications();

  const login =
  JSON.parse(
  localStorage.getItem("loginNotification")
  );

  if(login){

    saveNotification(
    login.title,
    login.message
    );

    localStorage.removeItem(
    "loginNotification"
    );
  }

});

// ==========================
// APK POPUP
// ==========================

function openApkPopup(){

  document.getElementById("apkPopup").style.display =
  "flex";

}

function closeApkPopup(){

  document.getElementById("apkPopup").style.display =
  "none";

}
function toggleProfileMenu(){

const menu =
document.getElementById("profileMenu");

if(menu.style.display === "block"){

menu.style.display = "none";

}else{

menu.style.display = "block";

}

}
function openAccountPage(){

document.getElementById(
"profilePage"
).style.display = "flex";

}

function closeAccountPage(){

document.getElementById(
"accountPage"
).style.display = "none";

}

document.getElementById(
"accountMobile"
).value =
localStorage.getItem("userMobile")
|| "";


function closeAccountPage(){

document.getElementById(
"accountPage"
).style.display = "none";

}
function saveAccountDetails(){

localStorage.setItem(
"profileName",
document.getElementById("accountName").value
);

localStorage.setItem(
"profileEmail",
document.getElementById("accountEmail").value
);

localStorage.setItem(
"profileCity",
document.getElementById("accountCity").value
);

alert("Account Saved");

}
document.addEventListener("DOMContentLoaded", function(){

const name =
document.getElementById("nameInput");

const mobile =
document.getElementById("mobileInput");

const amount =
document.getElementById("amountInput");

const message =
document.getElementById("messageInput");

if(name){

name.addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault();

mobile.focus();

}

});

}

if(mobile){

mobile.addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault();

amount.focus();

}

});

}

if(amount){

amount.addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault();

message.focus();

}

});

}

if(message){

message.addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault();

sendPayment();

}

});

}

});