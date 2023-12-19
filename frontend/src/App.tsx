import React, { useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { createShortenUrl } from "./apis/create-url";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useToast } from "./components/ui/use-toast";
import { DefaultLayout } from "./layouts/default";
import { Loader2 } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const computedUrl = useMemo(() => {
    if (shortenUrl) return `${window.location.host}/${shortenUrl}`;
    return null;
  }, [shortenUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleShortenUrl = async () => {
    try {
      setLoading(true);
      const result = await createShortenUrl({
        url,
      });
      setShortenUrl(result.data.hash);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(computedUrl || "");
    toast({
      title: "Copy to clipboard",
    });
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center mx-auto flex-col gap-4">
        <div className="flex max-w-sm items-center space-x-2">
          <Input
            onChange={handleChange}
            value={url}
            placeholder="Enter the link here"
          />
          <Button disabled={!url} onClick={handleShortenUrl}>
            {loading && <Loader2 />}
            Shorten URL
          </Button>
        </div>
        {computedUrl && (
          <div className="flex flex-col gap-2">
            <div
              onClick={handleCopy}
              className="drop-shadow-lg bg-secondary py-2 flex px-3 rounded-sm justify-between items-center cursor-pointer"
            >
              <p>{computedUrl}</p>
              <ClipboardCopyIcon />
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default App;
