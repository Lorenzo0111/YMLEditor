"use client";

import { useEffect, useState } from "react";
import { parse, stringify } from "yaml";
import { ObjectEditor } from "./ValueEditor";

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
      const string = stringify(data);
      if (string === file) return;

      setFile(string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setFile]);

  if (error) return <p className="text-red-500">{error}</p>;

  return <ObjectEditor value={data} setValue={setData} />;
}
