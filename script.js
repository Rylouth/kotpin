let reports = JSON.parse(localStorage.getItem("reports")) || [];

let editId = null;
function saveToStorage() {
  localStorage.setItem("reports", JSON.stringify(reports));
}

function addReport() {
  let nama = document.getElementById("nama").value.toUpperCase();
  let kategori = document.getElementById("kategori").value;
  let isi = document.getElementById("laporan").value;

  if (!nama || !isi) {
    alert("Isi semua field!");
    return;
  }

  if (editId !== null) {
    let report = reports.find(r => r.id === editId);

    report.nama = nama;
    report.kategori = kategori;
    report.isi = isi;
    report.tanggal = new Date().toLocaleString();

    editId = null;
    document.getElementById("kirim").innerText = "Kirim Laporan";

  } else {
    let id = Math.floor(Math.random() * 100000);

    let report = {
      id: id,
      nama: nama,
      kategori: kategori,
      isi: isi,
      tanggal: new Date().toLocaleString()
    };

    reports.push(report);
  }

  saveToStorage();
  render();

  document.getElementById("nama").value = "";
  document.getElementById("laporan").value = "";
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  reports.forEach((r) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="nama">${r.nama}</div>
      <div class="kategori">${r.kategori}</div>
      <div class="isi">${r.isi}</div>
      <div class="small">${r.tanggal}</div>

      <button onclick="edit(${r.id})">Edit</button>
      <button class="delete-btn" onclick="hapus(${r.id})">Hapus</button>
    `;

    list.appendChild(li);
  });
}

function edit(id) {
  let report = reports.find(r => r.id === id);

  document.getElementById("nama").value = report.nama;
  document.getElementById("kategori").value = report.kategori;
  document.getElementById("laporan").value = report.isi;

  editId = id;

  document.getElementById("kirim").innerText = "Update Laporan";
}

function hapus(id) {
  let konfirmasi = confirm("Yakin mau hapus laporan?");
  if (konfirmasi) {
    reports = reports.filter(r => r.id !== id);
    saveToStorage();
    render();
  }
}

document.getElementById("kirim").addEventListener("click", addReport);

render();

function showPage(page) {
  document.getElementById("laporanPage").style.display = "none";
  document.getElementById("mapPage").style.display = "none";

  if (page === "laporan") {
    document.getElementById("laporanPage").style.display = "block";
  } else {
    document.getElementById("mapPage").style.display = "block";
  }
}

function changeMap(no) {
  document.getElementById("mapview").src = `asset/stasiun/${no}.webp`;
}

document.getElementById("search").addEventListener("input", function() {
  let value = this.value.toLowerCase();
  let buttons = document.querySelectorAll(".angktbtn");

  buttons.forEach(btn => {
    let src = btn.getAttribute("src");

    if (src.includes(value)) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
});