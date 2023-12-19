import React, { useLayoutEffect, useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { createShortenUrl } from "./apis/create-url";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useToast } from "./components/ui/use-toast";
import { DefaultLayout } from "./layouts/default-layout";
import { Loader2 } from "lucide-react";
import { isValidHttpUrl } from "./utils/url";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const isValidUrl = useMemo(() => {
    return isValidHttpUrl(url);
  }, [url]);

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

  const reset = () => {
    setUrl("");
    setShortenUrl("");
  };

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#url__input",
        popover: {
          title: "Input the url",
          description: "Please place your url in here to shorten",
          onNextClick: () => {
            setUrl("https://github.com/hungthezorba/shorten-url");
            driverObj.moveNext();
          },
        },
      },
      {
        element: "#shorten-url__button",
        popover: {
          title: "Click the button",
          side: "right",
          description:
            "Click Shorten URL button here and wait for the shortened link to appear",
          onNextClick: async () => {
            await handleShortenUrl();
            driverObj.moveNext();
          },
        },
      },
      {
        element: "#shortened-url__box",
        popover: {
          title: "Congratulation 🎉",
          description: "Your shorten url is ready to used",
          side: "bottom",
          onCloseClick: () => {
            reset();
            driverObj.moveNext();
          },
          onNextClick: () => {
            reset();
            driverObj.moveNext();
          },
        },
      },
    ],
  });

  useLayoutEffect(() => {
    driverObj.drive();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-center mx-auto flex-col gap-4 w-full h-screen items-center">
        <div className="flex max-w-sm items-center justify-center space-x-2 w-full">
          <Input
            id="url__input"
            onChange={handleChange}
            value={url}
            placeholder="Enter the link here"
          />
          <Button
            id="shorten-url__button"
            disabled={!isValidUrl}
            onClick={handleShortenUrl}
          >
            {loading && <Loader2 />}
            Shorten URL
          </Button>
        </div>
        <div id="shortened-url__box" className="flex flex-col gap-2">
          {computedUrl && (
            <div
              onClick={handleCopy}
              className="hover:shadow-md drop-shadow-lg bg-secondary py-2 flex gap-2 px-4 rounded-sm justify-between items-center cursor-pointer"
            >
              <p>{computedUrl}</p>
              <ClipboardIcon />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default App;
