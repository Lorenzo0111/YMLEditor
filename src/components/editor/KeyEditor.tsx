import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export function KeyEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [key, setKey] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(key);
    }, 500);

    return () => clearTimeout(timeout);
  }, [key, setValue]);

  return <Input value={key} onChange={(e) => setKey(e.target.value)} />;
}
