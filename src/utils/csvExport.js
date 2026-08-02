export const exportCSV = (data, columns, filename = 'export.csv') => {
  const headers = columns.map((col) => `"${col.title}"`).join(',');

  const rows = data.map((row) =>
    columns
      .map((col) => {
        let value = row[col.dataIndex];
        if (col.exportRenderer) {
          value = col.exportRenderer(value, row);
        }
        if (value == null) value = '';
        value = String(value).replace(/"/g, '""');
        return `"${value}"`;
      })
      .join(',')
  );

  const csv = [headers, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
