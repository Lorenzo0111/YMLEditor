"use client";

import { FileEditor } from "@/components/editor/FileEditor";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<string | undefined>();

  return (
    <main className="flex justify-between min-h-screen gap-3 p-6">
      <Textarea
        className="flex-grow w-1/2 h-full resize-none"
        placeholder="YML File"
        value={file}
        onChange={(e) => setFile(e.target.value)}
      />

      <div className="w-1/2 flex flex-col h-full">
        <FileEditor file={file ?? ""} />
      </div>
    </main>
  );
}
