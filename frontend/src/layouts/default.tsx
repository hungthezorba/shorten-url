import { Toaster } from "@/components/ui/toaster";

export function DefaultLayout({children}: React.PropsWithChildren): React.ReactElement {
  return (
    <div>
      {children}
      <Toaster/>
    </div>
  )
}