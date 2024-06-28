import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { MessageContextProvider } from './context'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  </QueryClientProvider>
)