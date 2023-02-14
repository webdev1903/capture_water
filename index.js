let maxHeight = 0;
let totalWaterCaptured = 0;
let tableContainer = document.querySelector("#result_table");
let resContainer = document.querySelector("#res");

const handleClick = () => {
  totalWaterCaptured = 0;
  const str = document.querySelector("#input").value;
  let arr = str.trim().split(",").map(Number);
  maxHeight = Math.max(...arr);
  display(arr);
};

const handleChange = (e) => {};

const caputredWater = (arr) => {
  let left = [];
  let right = [];
  let n = arr.length;

  left[0] = arr[0];
  right[n - 1] = arr[n - 1];

  for (let i = 1; i < n; i++) {
    left[i] = Math.max(left[i - 1], arr[i]);
  }
  for (let i = n - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], arr[i]);
  }
  let ans = [];
  for (let i = 0; i < n; i++) {
    ans.push(Math.min(left[i], right[i])) - arr[i];
    totalWaterCaptured += Math.min(left[i], right[i]) - arr[i];
  }
  let matrix = new Array(maxHeight);
  for (let i = 0; i < maxHeight; i++) {
    let res = [];
    for (let j = 0; j < n; j++) {
      if (i + 1 <= ans[j] && i + 1 > arr[j]) {
        res.push("skyblue");
      } else if (i + 1 <= arr[j]) {
        res.push("yellow");
      } else {
        res.push("none");
      }
    }
    matrix[maxHeight - 1 - i] = res;
  }
  return matrix;
};

const display = (arr) => {
  const matrix = caputredWater(arr);
  tableContainer.innerHTML = "";
  resContainer.innerHTML = "";
  let table = document.createElement("table");
  let table1 = document.createElement("table");
  let tbody = document.createElement("tbody");
  let tbody1 = document.createElement("tbody");
  for (let i = 0; i < maxHeight; i++) {
    let tr = document.createElement("tr");
    let tr1 = document.createElement("tr");
    for (let j = 0; j < arr.length; j++) {
      let td = document.createElement("td");
      let td1 = document.createElement("td");
      td.style.backgroundColor = matrix[i][j];
      if (matrix[i][j] == "skyblue") {
        td1.style.backgroundColor = matrix[i][j];
      }

      tr.append(td);
      tr1.append(td1);
    }
    tbody.append(tr);
    tbody1.append(tr1);
  }
  table.append(tbody);
  table1.append(tbody1);
  let p = document.createElement("h3");
  p.textContent = "Total Water Captured : " + totalWaterCaptured + " units";
  tableContainer.append(table);
  let temp = document.createElement("div");
  temp.innerHTML = `<h3>Output : </h3><p>Total Water Captured : <span id="res_span">${totalWaterCaptured}</span> units.</p>`;
  resContainer.append(temp, table1);
};
