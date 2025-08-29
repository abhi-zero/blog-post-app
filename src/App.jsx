
import {Navbar, } from './components/index'
import { Outlet } from "react-router";
import Test from "./components/Test";


function App() {
  return(
   <div className="bg-[#FFFFFF] dark:bg-[#0A0A0A] transition-all duration-700 ease-in-out">
    <Navbar />
    <main className='pt-[150px]'>
      <Outlet />
    </main>
   </div>
  )
}

export default App;
