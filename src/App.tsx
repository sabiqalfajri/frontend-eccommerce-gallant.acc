import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { AppRouter } from './routes/AppRouter'

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <AppRouter />
    </TooltipProvider>
  )
}

export default App
