const puppeteer = require('puppeteer');

function captureNetworkData(url) {
  return async function () {
    // Launch a headless Chrome browser using Puppeteer
    const browser = await puppeteer.launch();
    
    // Open a new page
    const page = await browser.newPage();

    // Enable the Network domain to listen to network events
    await page.target().createCDPSession(async (cdp) => {
      await cdp.send('Network.enable');
    });

    // Set up event listeners for network events
    page.on('response', async (response) => {
      const request = response.request();

      // Extract relevant information
      const networkData = {
        url: response.url(),
        method: request.method(),
        status: response.status(),
        text:response.statusText(),
        address: response.remoteAddress(),

    
      };

      // Send network data to NestJS server
      await fetch('http://localhost:3000/api/network', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(networkData),
      });

      console.log('Network data sent to NestJS server:', networkData);
    });

    page.on('requestfailed', (request) => {
      console.log('Request failed:', request.url(), request.failure().errorText);
    });

    // Navigate to a URL
    await page.goto(url);
    

    // Close the browser
    await browser.close();
}
  };
  module.exports = {
    'Test Case 1': captureNetworkData('http://example.com'),
    'Test Case 2': captureNetworkData('http://example.com'),
    'Test Case 3': captureNetworkData('http://example.com'),
    
    
  };
