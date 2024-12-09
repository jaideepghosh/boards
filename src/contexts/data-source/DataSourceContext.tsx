"use client";
import React, { createContext, useContext, useState } from "react";

type DataSourceFormData = {
  connectionName: string;
  sourceURL: string;
  preferredKey?: string;
};

type DataSourceFormContextType = {
  formData: DataSourceFormData;
  updateFormData: (newData: Partial<DataSourceFormData>) => void;
};

const DataSourceFormContext = createContext<
  DataSourceFormContextType | undefined
>(undefined);

export const DataSourceFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<DataSourceFormData>({
    connectionName: "",
    sourceURL: "",
  });

  const updateFormData = (newData: Partial<DataSourceFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <DataSourceFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </DataSourceFormContext.Provider>
  );
};

export const useDataSourceFormContext = () => {
  const context = useContext(DataSourceFormContext);
  if (!context) {
    throw new Error(
      "useDataSourceFormContext must be used within a DataSourceFormProvider"
    );
  }
  return context;
};
