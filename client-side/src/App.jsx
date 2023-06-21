
import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './Common/Navigation'
import Footer from './Common/Footer'

function App() {

  return (
    <>
      <Navigation></Navigation>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
