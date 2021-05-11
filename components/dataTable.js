import React from "react";
import { Card, DataTable, Link, Page } from "@shopify/polaris";
import { useState, useCallback } from "react";
export default function DataTableLinkExample() {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
    ["Mae Jemison", "mae@gmail.com", "Ellen Ochoa", "John Doe", "20", "$123.12"],
    [
      "Ellen Ochoa",
      "job@gmail.com",
      "Mae Ochoa",
      "Ellen Doe",
      "50",
      "$1230.213",
    ],
    ["John Doe", "Decatur, USA", "Ellen Ochoa", "John Doe", "40", "$231.23"],
    [
      "Muri Dean",
      "ellen@gmail.com",
      "Mae Ochoa",
      "Ellen Doe",
      "50",
      "$333.213",
    ],
    [
      "Stephen Man",
      "@stephen@gmail.com",
      "Mae Ochoa",
      "Ellen Doe",
      "50",
      "$553.213",
    ],
    [
      "Men Wiri",
      "web@gmail.com",
      "Mae Ochoa",
      "Ellen Doe",
      "50",
      "$442.213",
    ],
  ];
  const rows = sortedRows ? sortedRows : initiallySortedRows;

  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
    [rows]
  );

  return (
    <Card
      title="Referral Customer Report"
      actions={[{ content: "Download CSV" }]}
    >
      <DataTable
        columnContentTypes={[
          "text",
          "text",
          "text",
          "text",
          "numeric",
          "numeric",
        ]}
        headings={[
          "Name",
          "Email",
          "Referred By",
          "Referred To",
          "Score",
          "Amount spent",
        ]}
        rows={rows}
        sortable={[false, false, false, false, true, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={4}
        onSort={handleSort}
      />
    </Card>
  );

  function sortCurrency(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index].substring(1));
      const amountB = parseFloat(rowB[index].substring(1));

      return direction === "descending" ? amountB - amountA : amountA - amountB;
    });
  }
}
