import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './componunts/Home.jsx'
import SuccessPayment from './componunts/SuccessPayment.jsx'


function App() {
  return(
   <Router> 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/paymentsuccess' element={<SuccessPayment />} />
    </Routes>
   </Router>
  )
}

export default App
