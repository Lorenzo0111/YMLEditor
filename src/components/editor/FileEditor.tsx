import { useEffect, useState } from "react";
import { parse } from "yaml";

export function FileEditor({ file }: { file: string }) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    try {
      setError(undefined);
      setData(parse(file));
    } catch (err: any) {
      setData(null);
      setError(err.message);
    }
  }, [file]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(data ?? {}).map(([key, value]) => (
        <div key={key} className="flex gap-3">
          <div className="w-1/4">{key}</div>
          <div
            className="flex-grow
                border border-gray-300 rounded p-2"
          >
            {JSON.stringify(value)}
          </div>
        </div>
      ))}
    </div>
  );
}
