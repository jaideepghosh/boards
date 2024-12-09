import React from "react";
import Header from "@/components/app/header";
import DataSourceForm from "@/components/pages/data-source";

export default function DataSourcePage() {
  return (
    <div>
      <Header />
      <div className="p-4 h-auto pt-20 ">
        <DataSourceForm />
      </div>
    </div>
  );
}
