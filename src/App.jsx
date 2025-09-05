import {Navbar, Notification} from './components/index'
import { Outlet } from "react-router";



function App() {
  return(
   <div className="bg-[#FFFFFF] dark:bg-[#0A0A0A] transition-all duration-700 ease-in-out">
    <Navbar />
   
    <main className='pt-[150px]'>
      <Outlet />

    </main>
     <Notification />
   </div>
  )
}

export default App;
