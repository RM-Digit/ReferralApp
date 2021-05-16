import React from "react";
import { Card, DataTable } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";
import { httpService } from "../services/httpService";
import CsvDownloader from "react-csv-downloader";
export default function DataTableLinkExample() {
  const initiallySortedRows = [
    ["Mae Jemison", "mae@gmail.com", "Ellen Ochoa", "John Doe", "20"],
    ["Ellen Ochoa", "job@gmail.com", "Mae Ochoa", "Ellen Doe", "50"],
    ["John Doe", "Decatur, USA", "Ellen Ochoa", "John Doe", "40", "$231.23"],
    ["Muri Dean", "ellen@gmail.com", "Mae Ochoa", "Ellen Doe", "50"],
    ["Stephen Man", "@stephen@gmail.com", "Mae Ochoa", "Ellen Doe", "50"],
    ["Men Wiri", "web@gmail.com", "Mae Ochoa", "Ellen Doe", "50"],
  ];
  const [sortedRows, setSortedRows] = useState(initiallySortedRows);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);

  const columns = [
    {
      id: "name",
      displayName: "name",
    },
    {
      id: "email",
      displayName: "email",
    },
    {
      id: "referredBy",
      displayName: "ReferredBy",
    },
    {
      id: "referredTo",
      displayName: "ReferredTo",
    },
    {
      id: "score",
      displayName: "Score",
    },
  ];

  const handleDownload = () => {};
  useEffect(() => {
    httpService.getCustomer().then((res) => {
      if (res.data.success) {
        const customerData = res.data.customer.map((customer) => {
          return [
            customer.name,
            customer.email,
            customer.referredBy,
            customer.referredTo,
            customer.score,
          ];
        });
        const csvData = res.data.customer.map((customer) => {
          return {
            name: customer.name,
            email: customer.email,
            referredBy: customer.referredBy,
            referredTo: customer.referredTo,
            score: customer.score,
          };
        });

        setSortedRows(customerData);
        setCsvData(csvData);
        setLoading(false);
      } else setSortedRows(initiallySortedRows);
    });
  }, []);

  return loading ? null : (
    <Card
      title="Referral Customer Report"
      actions={[
        {
          content: (
            <CsvDownloader
              filename="csv-customerData"
              columns={columns}
              datas={csvData}
            >
              Download CSV
            </CsvDownloader>
          ),
          onAction: handleDownload,
        },
      ]}
    >
      <DataTable
        columnContentTypes={["text", "text", "text", "text", "numeric"]}
        headings={["Name", "Email", "Referred By", "Referred To", "Score"]}
        rows={sortedRows}
        sortable={[false, false, false, false, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={4}
      />
    </Card>
  );
}
