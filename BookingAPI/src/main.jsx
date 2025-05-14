import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HomeController } from './HomeController.jsx'
import { HeaderContent } from './components/HeaderContent.jsx'
import { AddingBusToRoutePage } from './OperatorComponents/AddingBusToRoutePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AddingBusToRoutePage/> */}
    <HomeController />
  </StrictMode>
)
