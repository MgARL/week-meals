import * as XLXS from "xlsx/xlsx.mjs";

const DownloadExcel = () => {
  const table = document.getElementById("RFive");
  const workbook = XLXS.utils.book_new();
  const worksheet = XLXS.utils.table_to_sheet(table);
  console.log(worksheet);
  worksheet["!cols"] = [
    { wch: 1 },
    { wch: 9 },
    { wch: 9 },
    { wch: 9 },
    { wch: 50 },
  ];
  const date = new Date();
  const dateFormatted = `${date.getMonth()}/${date.getDay()}`;

  XLXS.utils.book_append_sheet(workbook, worksheet, "Page_1");
  XLXS.writeFile(workbook, `${dateFormatted}_Meals.xlsx`);
};

export default DownloadExcel;
