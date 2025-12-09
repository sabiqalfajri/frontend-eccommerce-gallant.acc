import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ClerkProvider } from '@clerk/clerk-react'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from 'react-router-dom'
import 'swiper/swiper-bundle.css'
import { CartSelectionProvider } from './context/CartSelectionContext.tsx'
import { CheckoutProvider } from './context/CheckoutContext.tsx'
import { FilterProvider } from './context/FilterContext.tsx'
import { AuthWathcer } from './providers/AuthWatcher.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <AuthWathcer />
    <QueryClientProvider client={queryClient}>
      <CartSelectionProvider>
        <CheckoutProvider>
          <FilterProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FilterProvider>
        </CheckoutProvider>
      </CartSelectionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ClerkProvider>
)

