document
  .getElementById("kodeAlamForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const nama = document.getElementById("namaLengkap").value;
    const kodealam = generateKodeAlam(nama);
    document.getElementById("hasil").innerHTML =
      `<p>Kode Alam untuk nama ${nama} adalah ${kodealam}</p>`;
    document.getElementById("namaLengkap").value = ""; // Clear the input field after submission
  });
function generateKodeAlam(nama) {
  const kodealams = [
    "alam mimpi",
    "alam semesta",
    "alam bawah sadar",
    "alam gaib",
    "alam nyata",
    "alam roh",
    "alam jin",
    "alam malaikat",
    "alam dewa",
    "alam manusia",
    "alam binatang",
    "alam tumbuhan",
    "alam air",
    "alam api",
    "alam udara",
    "alam tanah",
    "alam angkasa",
    "alam waktu",
    "alam ruang",
    "alam dimensi",
    "alam energi",
    "alam kekuatan",
    "alam kehancuran",
    "alam keajaiban",
    "alam keindahan",
    "alam kegelapan",
    "alam cahaya",
    "alam keheningan",
    "alam kebahagiaan",
    "alam kesedihan",
    "alam kehidupan",
    "alam cinta",
    "alam kebencian",
    "alam persahabatan",
    "alam permusuhan",
    "alam keberuntungan",
    "alam kesialan",
    "alam keberanian",
    "alam ketakutan",
    "alam kebijaksanaan",
    "alam kebodohan",
    "alam kekacauan",
    "alam ketertiban",
    "alam keadilan",
    "alam ketidakadilan",
    "alam kebenaran",
    "alam kebohongan",
    "alam kejujuran",
    "alam kepalsuan",
    "alam kesetiaan",
    "alam pengkhianatan",
    "alam keberhasilan",
    "alam kegagalan",
    "alam kekayaan",
    "alam kemiskinan",
    "alam kesehatan",
    "alam penyakit",
    "alam kebugaran",
    "alam kelelahan",
    "alam kekuatan",
    "alam kelemahan",
  ];
  const index = nama.length % kodealams.length;
  return kodealams[index];
}
