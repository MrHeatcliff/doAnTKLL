// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBf6DTdxqhewOpQc5PCa1VWHKCaTItBWww",
  // authDomain: "doantkll-73b19.firebaseapp.com",
  databaseURL: "https://doantkll-73b19-default-rtdb.firebaseio.com",
  // projectId: "doantkll-73b19",
  // storageBucket: "doantkll-73b19.appspot.com",
  // messagingSenderId: "653013985386",
  // appId: "1:653013985386:web:b55050da1d21a5a1184213",
  // measurementId: "G-BTH4WGRDNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const history1 = ref(db, "history/1");
const history2 = ref(db, "history/2");
let history=[];

history.push(history1)
history.push(history2)
// console.log(history[0])


const SpO2 = ref(db, "data/w7cSwh8OZ2Oj4eIY9UhsVX1i1qj1/SpO2");
const BPM = ref(db, "data/w7cSwh8OZ2Oj4eIY9UhsVX1i1qj1/beat");

const bpmEl = document.getElementById("bpm");
const oxyEl = document.getElementById("oxy");
const avebpmEl = document.getElementById("avebpm");
const aveoxyEl = document.getElementById("aveoxy");
const saveButtonEl = document.getElementById("saveButton");
const clearButtonEl = document.getElementById("clearButton");
const historyButtonEl = document.getElementById("historyButton");

var oldBPM = 0;
var oldOxy = 0;
var sumBPM = 0;
var sumOxy = 0;
var countBPM = 0;
var countOxy = 0;
var flag = 1;
var today = new Date();

clearButtonEl.addEventListener("click", function() {
  sumBPM = 0;
  sumOxy = 0;
  countBPM = 0;
  countOxy = 0;
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes();

  remove(history1);
  remove(history2);
  // push(history1, {
  //   aveBeat: 0,
  //   aveSpO2: 0,
  //   date: date
  // });
  // push(history2, {
  //   aveBeat: 0,
  //   aveSpO2: 0,
  //   date: date
  // });
  avebpmEl.innerHTML = '';
  aveoxyEl.innerHTML = '';
})

saveButtonEl.addEventListener("click", function() {
  flag = !flag;
  console.log("flag-start:", flag);
  if (flag) {
    saveButtonEl.style.backgroundColor = '#33FF33';
    if (countOxy > 0 && countBPM > 0) {
      var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes();

      get(history1).then((snapshot) => {
        //'snapshot.exists' checks data is available or its null
        // And return boolean value
        console.log(Object.keys(snapshot.val()))
        remove(history2);
        if (snapshot.exists) {
          let data = snapshot.val()
          console.log("history1", data);
          update(history2, data);
        }
      })
        .catch((error) => console.log(error));

      remove(history1);

      push(history1, {
        aveBeat: sumBPM / countBPM,
        aveSpO2: sumOxy / countOxy,
        date: date
      });
    }
    else console.log("Chưa nhập dữ liệu!")
    sumBPM = 0;
    sumOxy = 0;
    countOxy = 0;
    countBPM = 0;
  }
  else {
    // onValue(data, function(snapshot) {
    //   // let arr = Object.keys(snapshot.val())[1]
    //   // Object.values(snapshot.val())
    //   // console.log(snapshot.val().arr.beat )
    //   let beat = snapshot.val().w7cSwh8OZ2Oj4eIY9UhsVX1i1qj1.beat;
    //   let oxy = snapshot.val().w7cSwh8OZ2Oj4eIY9UhsVX1i1qj1.SpO2;

    //   console.log(oxy);
    //   console.log(beat);
    //   updateChartData(beat)

    //   bpmEl.innerHTML = beat
    //   oxyEl.innerHTML = oxy

    //   sumBPM += beat;
    //   sumOxy += oxy;
    //   count += 1;

    //   let aveBPM = sumBPM / count;
    //   let aveOxy = sumOxy / count;
    //   console.log(aveBPM);
    //   console.log(aveOxy);

    //   avebpmEl.innerHTML = aveBPM.toFixed(2);
    //   aveoxyEl.innerHTML = aveOxy.toFixed(2);
    // })
    onValue(BPM, function(snapshot) {
      // let arr = Object.keys(snapshot.val())[1]
      // Object.values(snapshot.val())
      // console.log(snapshot.val().arr.beat )
      let beat = snapshot.val();

      // console.log(oxy);
      console.log("beat", beat);
      updateChartData(beat);

      bpmEl.innerHTML = beat;
      // oxyEl.innerHTML = oxy

      sumBPM += beat;
      // sumOxy += oxy;
      countBPM += 1;

      let aveBPM = sumBPM / countBPM;
      // let aveOxy = sumOxy / count;
      // console.log(aveBPM);
      // console.log(aveOxy);

      avebpmEl.innerHTML = aveBPM.toFixed(2);
      // aveoxyEl.innerHTML = aveOxy.toFixed(2);
    });
    onValue(SpO2, function(snapshot) {
      // let arr = Object.keys(snapshot.val())[1]
      // Object.values(snapshot.val())
      // console.log(snapshot.val().arr.beat )
      let oxy = snapshot.val();

      console.log("oxy", oxy);
      // console.log(beat);
      // updateChartData(beat)

      // bpmEl.innerHTML = beat
      oxyEl.innerHTML = oxy;

      // sumBPM += beat;
      sumOxy += oxy;
      countOxy += 1;

      // let aveBPM = sumBPM / countOxy;
      let aveOxy = sumOxy / countOxy;
      // console.log(aveBPM);
      // console.log(aveOxy);

      // avebpmEl.innerHTML = aveBPM.toFixed(2);
      aveoxyEl.innerHTML = aveOxy.toFixed(2);
    });
    console.log("Đang nhập dữ liệu!");
    saveButtonEl.style.backgroundColor = '#AC485A';

  }
  console.log("flag-end:", flag);
})

const ctx = document.getElementById('myChart');
let n = 0;
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'BPM',
      data: [],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
// function changeChartData() {
// const newData = [5, 10, 15, 20, 25, 30];
// chart.data.datasets[0].data = newData;
// chart.update();
function updateChartData(data) {
  if (n < 5) {

    ++n;
  }

  // chart.data.labels.push(''); // Thêm một nhãn trống

  chart.data.datasets[0].data.push(data); // Thêm giá trị dữ liệu
  if (n == 5) {
    chart.data.labels.push(''); // Thêm một nhãn trống
    chart.data.labels.splice(0, 1);
    chart.data.datasets[0].data.splice(0, 1);
  }

  chart.update(); // Cập nhật biểu đồ
}


// Lấy tham chiếu đến các phần tử trong DOM
const popupContainer = document.getElementById('popupContainer');
const closeButton = document.getElementById('closeButton');
const tableContainer = document.getElementById('tableContainer');

// Gán sự kiện click cho nút hiển thị pop-up
historyButtonEl.addEventListener('click', function() {
  popupContainer.style.display = 'block';
  // resizePopup();
});

// Gán sự kiện click cho nút đóng pop-up
closeButton.addEventListener('click', function() {
  popupContainer.style.display = 'none';
});

// Đặt lại kích thước pop-up dựa trên nội dung
function resizePopup() {
  const contentWidth = tableContainer.offsetWidth;
  const maxWidth = window.innerWidth * 0.8; // Tùy chỉnh tỷ lệ tối đa của độ rộng
  const newWidth = Math.min(contentWidth, maxWidth);
  popup.style.maxWidth = newWidth + 'px';
}

// Gọi lại hàm resizePopup khi thay đổi kích thước cửa sổ
window.addEventListener('resize', resizePopup);


// Định nghĩa hàm hiển thị bảng
function showTable() {
  // Tạo một bảng
  const table = document.createElement('table');

  // Thêm các dòng và cột vào bảng
  for (let i = 0; i < 2; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 2; j++) {
      const cell = document.createElement('td');
      // let path = 'history/${i + 1}'
      if(j == 0) cell.textContent = `Lần đo sớm thứ ${i + 1} `;
      else{
      get(history[i]).then((snapshot) => {
        //'snapshot.exists' checks data is available or its null
        // And return boolean value
        
        // console.log(key)
        // console.log(val)

        if (snapshot.exists) {
          let key = Object.keys(snapshot.val())
          let val = Object.values(snapshot.val())
          // console.log(key)
          // console.log(val)
          cell.textContent = `Average beat: ${val[0].aveBeat} BPM, Average SpO2: ${val[0].aveSpO2} %, Date: ${val[0].date}`;
          
          cell.style.marginLeft = '20px';
          cell.style.paddingLeft = '20px';
        
        }
        
      })
        .catch((error) => console.log(error));
      }

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  // Xóa nội dung hiện có trong container (nếu có)
  tableContainer.innerHTML = '';

  // Thêm bảng vào container
  tableContainer.appendChild(table);
}

// Gán sự kiện click cho nút hiển thị bảng
historyButtonEl.addEventListener('click', showTable);