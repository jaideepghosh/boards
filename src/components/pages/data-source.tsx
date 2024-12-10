"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  DataRow,
  DataSourceFormProvider,
  TableProps,
  useDataSourceFormContext,
} from "@/contexts/data-source/DataSourceContext";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { getStructure } from "@/lib/getStructure";
import { createDocument } from "@/services/data-source";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/toast";
import Link from "next/link";

type Inputs = {
  connectionName: string;
  sourceURL: string;
};

const AddSourceStep = ({ onNext }: { onNext: () => void }) => {
  const { formData, updateFormData } = useDataSourceFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: formData, // Pre-fill inputs with context data
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateFormData({ ...data, preferredKey: undefined }); // Update context with form data
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-y-4 p-4 bg-background">
        <div className="sm:col-span-4">
          <label
            htmlFor="connectionName"
            className="block text-sm/6 font-medium text-gray-500"
          >
            Connection Name
          </label>
          <div className="mt-2">
            <Input
              type="text"
              id="connectionName"
              className="block w-full py-1.5 pl-3 pr-3 text-gray-500 bg-white border border-gray-300 rounded-md focus:ring-indigo-600"
              placeholder="User Records"
              {...register("connectionName", {
                required: "Connection Name is required!",
              })}
            />
            {errors.connectionName && (
              <span className="text-red-500">
                {errors.connectionName.message}
              </span>
            )}
          </div>
        </div>
        <div className="sm:col-span-4">
          <label
            htmlFor="sourceURL"
            className="block text-sm/6 font-medium text-gray-500"
          >
            Source URL
          </label>
          <div className="mt-2">
            <Input
              type="text"
              id="sourceURL"
              className="block w-full py-1.5 pl-3 pr-3 text-gray-500 bg-white border border-gray-300 rounded-md focus:ring-indigo-600"
              placeholder="example.com/users.json"
              {...register("sourceURL", {
                required: "Source URL is required!",
                pattern: {
                  value: /(https?:\/\/)?[\w.-]+\.[a-z]{2,}([\/\w .-]*)*\/?/,
                  message: "Invalid Source URL!",
                },
              })}
            />
            {errors.sourceURL && (
              <span className="text-red-500">{errors.sourceURL.message}</span>
            )}
          </div>
        </div>
        <Button type="submit">
          <svg
            className="w-3 h-3 text-white me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
          Let&apos;s Test
        </Button>
      </div>
    </form>
  );
};

const TestConnectionStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [responseKeys, setResponseKeys] = useState<string[]>([]);
  const { formData, updateFormData } = useDataSourceFormContext();
  const [response, setResponse] = useState();

  const getSchema = useCallback(async () => {
    try {
      const result = await axios.get(formData.sourceURL);
      setResponseKeys(Object.keys(result));
      setResponse(result.data);
    } catch (error) {
      console.error("error:: ", error);
    }
  }, [formData.sourceURL]);

  useEffect(() => {
    getSchema();
  }, [getSchema]);

  const handleKeySelection = (key: string) => {
    updateFormData({ ...formData, preferredKey: key, response });
  };

  return (
    <div className="grid gap-y-4 p-4 bg-background">
      <h2 className="text-lg font-semibold">Test Connection</h2>
      {responseKeys.length > 0 ? (
        <Select onValueChange={handleKeySelection}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Peferred Key" />
          </SelectTrigger>
          <SelectContent>
            {responseKeys.map((key) => (
              <SelectItem value={key} key={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md w-44"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={onPrev} variant="secondary">
          <svg
            className="w-3 h-3 text-gray-500 me-2 rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
          Back
        </Button>
        <Button
          type="submit"
          onClick={onNext}
          disabled={!formData.preferredKey}
        >
          <svg
            className="w-3 h-3 text-white me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
          Let&apos;s Save
        </Button>
      </div>
    </div>
  );
};

const ResponsePreviewTable: React.FC<TableProps> = ({ data, columns }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {columns.map((col) => (
          <TableHead key={col} className="truncate">
            {col}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.slice(0, 5).map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((col) => (
            <TableCell key={col} className="truncate">
              {row[col]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ReviewStep = ({ onPrev }: { onPrev: () => void }) => {
  const { toast } = useToast();
  const { formData } = useDataSourceFormContext();

  const { response } = formData;

  // Ensure response is an array for the table
  const tableData: DataRow[] = Array.isArray(response) ? response : [response];

  // Define table columns (adjust keys based on the response structure)

  const columns = Object.keys(getStructure(tableData)[0]).filter(
    (key) => typeof getStructure(tableData)[0][key] !== "object"
  );

  const saveDataSource = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { response: _, ...dataSourcePayload } = formData;
    try {
      await createDocument(dataSourcePayload);
      toast({
        title: "Data source has been added",
        action: (
          <Link href="/canvas">
            <ToastAction altText="Create Canvas">Create Canvas</ToastAction>
          </Link>
        ),
      });
    } catch (error) {
      console.error("saveDataSource:: error:: ", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        action: (
          <ToastAction altText="Try again" onClick={saveDataSource}>
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div className="grid gap-y-4 p-4 bg-background">
      <h2 className="text-lg font-semibold">Review</h2>
      <p>Review your data and save the source.</p>
      <ResponsePreviewTable data={tableData} columns={columns} />
      <div className="flex gap-4">
        <Button onClick={onPrev} variant="secondary">
          <svg
            className="w-3 h-3 text-gray-500 me-2 rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
          Back
        </Button>
        <Button onClick={saveDataSource}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          Save Data Source
        </Button>
      </div>
    </div>
  );
};

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {["Add a source", "Test connection", "Review"].map((step, index) => (
        <li
          key={index}
          className={`flex items-center ${
            currentStep === index + 1 ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 border ${
              currentStep === index + 1 ? "border-blue-600" : "border-gray-500"
            } rounded-full`}
          >
            {index + 1}
          </span>
          <span className="ml-2">{step}</span>
          {index < 2 && (
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
};

export default function DataSourceForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="max-w-lg mx-auto">
      <DataSourceFormProvider>
        <StepIndicator currentStep={currentStep} />
        <div className="mt-5">
          {currentStep === 1 && <AddSourceStep onNext={nextStep} />}
          {currentStep === 2 && (
            <TestConnectionStep onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 3 && <ReviewStep onPrev={prevStep} />}
        </div>
      </DataSourceFormProvider>
    </div>
  );
}
