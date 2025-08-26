import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
    className='flex items-center-safe justify-center'
    >
      <h1>Tailwind working</h1>
    </div>
  )
}

export default App
