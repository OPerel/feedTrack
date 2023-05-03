import './App.css';
import Meals from './components/Meals';
import Feels from './components/Feels';
import ItemsTimeline from './components/ItemsTimeline';
import { useEffect, useRef } from 'react';

function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop += ref.current.scrollHeight;
    }
  }, []);

  return (
    <div ref={ref} className="overflow-y-scroll w-screen my-16">
      {/*<Meals />*/}
      <ItemsTimeline />
      {/*<Feels />*/}
    </div>
  );
}

export default App;
