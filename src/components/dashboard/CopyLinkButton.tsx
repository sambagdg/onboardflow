"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 shrink-0">
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          Copié !
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copier le lien client
        </>
      )}
    </Button>
  );
}
