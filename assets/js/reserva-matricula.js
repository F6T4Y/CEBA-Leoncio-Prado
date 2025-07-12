document
  .getElementById("formBoleta")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nombre = document.getElementById("nombre").value;
    const grado = document.getElementById("grado").value;
    const monto = document.getElementById("monto").value;
    const fecha = new Date().toLocaleDateString();

    // Título centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("COLEGIO CEBA LEONCIO PRADO", 105, 20, null, null, "center");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 35);
    doc.text(`Alumno: ${nombre}`, 20, 45);
    doc.text(`Grado: ${grado}`, 20, 55);
    doc.text(`Monto de matrícula: S/ ${monto}`, 20, 65);

    doc.setFont("times", "italic");
    doc.setTextColor(60);
    doc.text("Gracias por su confianza en nuestra institución.", 20, 80);

    // Código QR (contenido puede ser una URL de validación o datos)
    const qrData = `Alumno: ${nombre}\nGrado: ${grado}\nMonto: S/ ${monto}\nFecha: ${fecha}`;
    const qrCanvas = document.createElement("canvas");
    await QRCode.toCanvas(qrCanvas, qrData);

    const qrImage = qrCanvas.toDataURL("image/png");
    doc.addImage(qrImage, "PNG", 150, 35, 40, 40);

    // Generar número de boleta único (ejemplo: BOL-20250710-8431)
    const fechaHoy = new Date();
    const fechaCodigo = fechaHoy.toISOString().slice(0, 10).replace(/-/g, "");
    const aleatorio = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatorios
    const numeroBoleta = `BOL-${fechaCodigo}-${aleatorio}`;

    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(`N° de Boleta: ${numeroBoleta}`, 190, 30, null, null, "right");

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.line(20, 100, 190, 100);

    // Términos y condiciones (footer detallado)
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(`TÉRMINOS Y CONDICIONES`, 105, 110, null, null, "center");
    const condiciones = [
      "1. Esta boleta es una constancia de pago válido para la reserva de matrícula.",
      "2. El CEBA Leoncio Prado no se responsabiliza por pérdidas o duplicación de este documento.",
      "3. Cualquier reclamo debe realizarse en un plazo no mayor a 7 días hábiles.",
      "4. La atención en oficina es de lunes a viernes de 09:00 a 15:00 y sábados de 08:00 a 19:00.",
      "5. Dirección principal: Carretera Central Km 95 - Apata - Jauja - Junín - Perú.",
      "6. Sede Lima: Calle Los Claveles Mz C Lt 35, Asociación de Vivienda La Encalada - Huachipa.",
    ];

    let y = 118;
    condiciones.forEach((line) => {
      doc.text(line, 20, y);
      y += 6;
    });

    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(
      "© 2004 - 2025 CEBA Leoncio Prado. Todos los derechos reservados.",
      105,
      y + 10,
      null,
      null,
      "center"
    );

    doc.save("boleta_matricula.pdf");
  });
