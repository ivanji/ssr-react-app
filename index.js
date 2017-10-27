/* server side */
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/App';
import getFacts from './src/facts';
import express from 'express';
import fs from 'fs';

const app = express();
const index = fs.readFileSync(__dirname + '/index.html', "utf-8");

function handleRender(req, res) {
    getFacts().then(facts => {
        const html = renderToString(<App facts={facts} />);
        const finalHtml = index.replace('<!-- ::APP:: -->', html);
        res.set('cache-control', 'public, max-age=600, s-maxage=1200'); //Caching layer to store in CDN
        res.send(finalHtml);
    });
}

// Serve built files with static files middleware
//app.use('/build', express.static(path.join(__dirname, 'build')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000);
//Todo: HTML is being rendered to bundle.js + Performance is awful
//export let ssrapp = functions.https.onRequest(app); // if using firebase functions