import React from "react";
import {
  TextStyle,
  Card,
  IndexTable,
  useIndexResourceState,
} from "@shopify/polaris";

export default function Index() {
  const customers = [
    {
      id: "3414",
      url: "customers/341",
      name: "Mae Jemison",
      location: "Decatur, USA",
      referredBy: "Ellen Ochoa",
      referredTo: "John Doe",
      score: 20,
      amountSpent: "$2,400",
    },
    {
      id: "2564",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      referredBy: "John Doe",
      referredTo: "Mae Jemison",
      score: 30,
      amountSpent: "$140",
    },
    {
      id: "2233",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      referredBy: "John Doe",
      referredTo: "Mae Jemison",
      score: 30,
      amountSpent: "$140",
    },
    {
      id: "1234",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      referredBy: "John Doe",
      referredTo: "Mae Jemison",
      score: 30,
      amountSpent: "$140",
    },
    {
      id: "1221",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      referredBy: "John Doe",
      referredTo: "Mae Jemison",
      score: 30,
      amountSpent: "$140",
    },
  ];
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(customers);

  const promotedBulkActions = [
    {
      content: "Edit customers",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  const rowMarkup = customers.map(
    (
      { id, name, location, score, referredBy, referredTo, amountSpent },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{referredBy}</IndexTable.Cell>
        <IndexTable.Cell>{referredTo}</IndexTable.Cell>
        <IndexTable.Cell>{score}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card
      title="Referral Customer Report"
      actions={[{ content: "Download CSV" }]}
    >
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        hasMoreItems
        // bulkActions={bulkActions}
        // promotedBulkActions={promotedBulkActions}
        headings={[
          { title: "Name" },
          { title: "Location" },
          { title: "Referred By" },
          { title: "Referred To" },
          { title: "Score" },
          { title: "Amount spent" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
