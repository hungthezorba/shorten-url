import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function App() {

  return (
    <div className='flex justify-center mx-auto'>
      <div className='flex max-w-sm items-center space-x-2'>
        <Input placeholder="Enter the link here"/>
        <Button>Shorten URL</Button>
      </div>
    </div>
  )
}

export default App
