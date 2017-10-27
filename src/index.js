import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import getFacts from './facts';

getFacts().then(facts => {
   ReactDOM.render(<App facts={facts} />,
      document.getElementById('app')
   );
});

