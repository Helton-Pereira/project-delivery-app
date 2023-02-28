import React from 'react';
import './App.css';
import DeliveryAppProvider from './context/DeliveryAppProvider';

function App() {
  return (
    <DeliveryAppProvider>
      <div>alguma coisa</div>
    </DeliveryAppProvider>
  );
}

export default App;

// inciando o front
