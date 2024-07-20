"use client";

import { FileEditor } from "@/components/editor/FileEditor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<string | undefined>();

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Data not saved";
    };
  }, []);

  return (
    <main className="flex justify-between min-h-screen gap-3 p-6">
      <Textarea
        className="w-1/2"
        style={{
          height: "calc(100vh - 48px)",
        }}
        placeholder="YML File"
        value={file}
        onChange={(e) => setFile(e.target.value)}
      />

      <div
        className="w-1/2 flex flex-col gap-3 overflow-auto"
        style={{
          minHeight: "calc(100vh - 48px)",
          maxHeight: "calc(100vh - 48px)",
        }}
      >
        <FileEditor file={file ?? ""} setFile={setFile} />

        {file && (
          <Button
            className="mt-auto"
            onClick={() => {
              const blob = new Blob([file], { type: "text/yml" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "data.yml";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download
          </Button>
        )}
      </div>
    </main>
  );
}
