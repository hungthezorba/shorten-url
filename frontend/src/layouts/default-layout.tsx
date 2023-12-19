import { Toaster } from "@/components/ui/toaster";
import logo from '@/assets/logo-no-background.svg'

export function DefaultLayout({children}: React.PropsWithChildren): React.ReactElement {
  return (
    <div>
      <div className="bg-black absolute top-0 w-full flex justify-center py-4">
        <img src={logo} className="h-5" />
      </div>
      {children}
      <Toaster/>
    </div>
  )
}