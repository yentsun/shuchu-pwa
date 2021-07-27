import React from 'react';
import Card from './Card/Card';
import photo1 from './Card/31_19 06 21.jpg';
import photo2 from './Card/IMG_9013.jpg';
import photo3 from './Card/DSC_3142.JPG';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card color="#a793acff" image={{ x: -15, y: -30, width: 260, xlinkHref: photo1 }} />
        <Card color="black" image={{ x: -20, y: -20, width: 260, xlinkHref: photo2 }} />
        <Card color="grey" image={{ x: -15, y: -30, width: 260, xlinkHref: photo3 }} />
      </header>
    </div>
  );
}

export default App;
