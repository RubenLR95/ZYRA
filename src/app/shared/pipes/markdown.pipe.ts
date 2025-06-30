import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'simpleMarkdown',
  standalone: true
})
export class SimpleMarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;

    let html = value;

    // Negrita y cursiva básicas
    html = html
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Detectar y convertir múltiples tablas en bloques separados
    const tableRegex = /((?:^\s*\|.+\|\s*\n)+)/gm;
    html = html.replace(tableRegex, (match) => {
      const lines = match.trim().split('\n').map(line => line.trim());

      if (lines.length < 2) return match; // no procesar si no hay cabecera y al menos una fila

      const headers = lines[0].slice(1, -1).split('|').map(h => h.trim());
      const rows = lines.slice(2).map(row =>
        row.slice(1, -1).split('|').map(cell => cell.trim())
      );

      // Generar tabla HTML
      let tableHtml = '<table><thead><tr>';
      headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';
      rows.forEach(row => {
        tableHtml += '<tr>';
        row.forEach(cell => {
          tableHtml += `<td>${cell}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table>';

      return tableHtml;
    });

    // Opcional: convertir saltos de línea simples en <br>
    html = html.replace(/\n/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}


























// import { Pipe, PipeTransform } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// @Pipe({
//   name: 'simpleMarkdown',
//   standalone: true        // ← aquí
// })
// export class SimpleMarkdownPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}

// transform(value: string): SafeHtml {
//   if (!value) return value;

//   let html = value
//     .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
//     .replace(/\*(.+?)\*/g, '<em>$1</em>');

//   // Detectar bloques de tabla
//   const lines = value.split(/\r?\n/);
//   const tableStart = lines.findIndex(l => /^\s*\|.+\|\s*$/.test(l));
//   if (tableStart >= 0 && lines[tableStart + 1]?.match(/^\s*\|[-\s|:]+\|\s*$/)) {
//     // Cabecera y separador
//     const header = lines[tableStart].trim().slice(1, -1).split('|').map(h => h.trim());
//     const rows = [];
//     for (let i = tableStart + 2; i < lines.length && /^\s*\|.+\|\s*$/.test(lines[i]); i++) {
//       rows.push(lines[i].trim().slice(1, -1).split('|').map(c => c.trim()));
//     }
//     // Construir HTML de tabla
//     let tbl = '<table><thead><tr>';
//     header.forEach(h => tbl += `<th>${h}</th>`);
//     tbl += '</tr></thead><tbody>';
//     rows.forEach(r => {
//       tbl += '<tr>';
//       r.forEach(c => tbl += `<td>${c}</td>`);
//       tbl += '</tr>';
//     });
//     tbl += '</tbody></table>';
//     html = html.replace(
//       lines.slice(tableStart, tableStart + 2 + rows.length).join('\n'),
//       tbl
//     );
//   }

//   return this.sanitizer.bypassSecurityTrustHtml(html);
// }

// }
