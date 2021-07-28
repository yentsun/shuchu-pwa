import React from 'react';
import Card from './Card/Card';
import photo1 from './Card/31_19 06 21.jpg';
import photo2 from './Card/IMG_9013.jpg';
import photo3 from './Card/DSC_3142.JPG';
import photo4 from './Card/7080328517736425992-account_id=1.jpg';
import photo5 from './Card/12011115_1479684472339077_7101187587758133558_n.jpg';
import photo6 from './Card/Изображение 471.jpg';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card title="before wedding" flavor="moments before this beauty belongs to a man"
              color="#a793acff" image={{ x: -15, y: -30, width: 260, xlinkHref: photo1 }} />
        <Card title="the pose" flavor="boss at day, playful cat at night" color="black" image={{ x: -20, y: -20, width: 260, xlinkHref: photo2 }} />
        <Card title="street queen" flavor="she dominates until you conquer her" color="grey" image={{ x: -15, y: -30, width: 260, xlinkHref: photo3 }} />
        <Card title="vika" flavor="" color="#5A932D48" image={{ x: -30, y: -100, width: 350, xlinkHref: photo4 }} />
        <Card title="dasha" flavor="mouthwatering devil" color="#93593948" image={{ x: -140, y: -50, xlinkHref: photo5 }} />
        <Card title="julia" flavor="the fitch outfit" color="grey" image={{ x: -15, y: -30, width: 600, xlinkHref: photo6 }} />
      </header>
    </div>
  );
}

export default App;
