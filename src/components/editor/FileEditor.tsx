"use client";

import { useEffect, useState } from "react";
import { parse, stringify } from "yaml";
import { Button } from "../ui/button";
import { KeyEditor } from "./KeyEditor";
import { ValueEditor } from "./ValueEditor";

export function FileEditor({
  file,
  setFile,
}: {
  file: string;
  setFile: (file: string) => void;
}) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        setError(undefined);
        setData(parse(file));
      } catch (err: any) {
        setData(null);
        setError(err.message);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [file]);

  useEffect(() => {
    if (data) {
      setFile(stringify(data));
    }
  }, [data, setFile]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(data ?? {}).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <KeyEditor
            value={key}
            setValue={(newKey) => {
              const newData = { ...data };
              delete newData[key];
              newData[newKey] = value;
              setData(newData);
            }}
          />

          <ValueEditor
            value={value}
            setValue={(newData) => {
              setData((prevData: any) => ({ ...prevData, [key]: newData }));
            }}
          />
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => setData({ ...data, [Object.keys(data).length]: "" })}
      >
        Add Field
      </Button>
    </div>
  );
}
