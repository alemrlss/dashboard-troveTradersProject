import { PDFDocument, rgb } from "pdf-lib";

export const generatePDF = async (usersData) => {
  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();

  // Calcular el número de páginas necesarias
  const numUsers = usersData.length;
  const usersPerPage = 25; // Ajusta este valor según tu diseño
  const numPages = Math.ceil(numUsers / usersPerPage);

  // Configurar el tamaño de la página
  const pageWidth = 800;
  const pageHeight = 800; // Ajusta la altura según tus necesidades

  // Ancho de columna personalizado para el campo de correo
  const emailColumnWidth = 300; // Ajusta el ancho según tus necesidades

  // Declarar la variable headerColumns antes de su uso
  const headerText = "Nombre, Apellido, Género, Usuario, Correo";
  const headerColumns = headerText.split(", ");

  // Iterar a través de las páginas y agregar usuarios
  for (let pageNum = 0; pageNum < numPages; pageNum++) {
    // Agregar una nueva página al documento
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Definir el contenido del PDF en cada página
    const yOffset = pageHeight - 50; // Ajusta la posición vertical según tus necesidades
    const startIndex = pageNum * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, numUsers);

    page.drawText(
      `Lista de Usuarios registrados en la Aplicación - Página ${pageNum + 1}`,
      {
        x: 50,
        y: yOffset,
        size: 16,
        color: rgb(0, 0, 0),
      }
    );

    // Definir las coordenadas para la tabla
    const tableX = 50;
    const tableY = yOffset - 40; // Ajusta la posición vertical de la tabla

    // Definir el ancho de las columnas
    const columnWidth = (pageWidth - tableX) / headerColumns.length;

    // Agregar la fila de cabecera con los nombres de los atributos
    for (let j = 0; j < headerColumns.length; j++) {
      const columnText = headerColumns[j];
      const x = tableX + j * columnWidth + 5;

      if (columnText === "Correo") {
        // Usar el ancho personalizado para el campo de correo
        page.drawText(columnText, {
          x,
          y: tableY - 12,
          size: 12,
          color: rgb(0, 0, 0),
          width: emailColumnWidth,
        });
      } else {
        page.drawText(columnText, {
          x,
          y: tableY - 12,
          size: 12,
          color: rgb(0, 0, 0),
        });
      }
    }

    // Agregar contenido a las celdas de la tabla
    for (let i = startIndex; i < endIndex; i++) {
      const user = usersData[i];
      const rowY = tableY - (i - startIndex + 1) * 20; // Ajusta el espaciado vertical según la fila

      const columns = [
        user.name,
        user.lastName,
        user.gender,
        `@${user.username}`,
        user.email,
      ];

      for (let j = 0; j < columns.length; j++) {
        const columnText = columns[j];
        const x = tableX + j * columnWidth + 5;

        if (j === 4) {
          // Usar el ancho personalizado para el campo de correo
          page.drawText(columnText, {
            x,
            y: rowY - 12,
            size: 12,
            color: rgb(0, 0, 0),
            width: emailColumnWidth,
          });
        } else {
          page.drawText(columnText, {
            x,
            y: rowY - 12,
            size: 12,
            color: rgb(0, 0, 0),
          });
        }
      }
    }
  }

  // Serializar el documento PDF a bytes
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
