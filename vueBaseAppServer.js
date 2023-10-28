const fs = require('fs');
const express = require('express');
const app = express();
const compression = require('compression');
const https = require('https');
const argv = require('yargs')
    .string('env')
    .argv;

// set config file based on env
if (argv.hasOwnProperty('env') && argv.env) {
	console.log('Env param found:', argv.env);
	require('dotenv').config({ path: `${__dirname}/config/.env.${argv.env.toLowerCase()}` })
} else {
	console.log('No env param found defaulting to .env');
	require('dotenv').config({ path: `${__dirname}/config/.env` });
}

// app properties from .env file
const appProps = {};
for (const [key, value] of Object.entries(process.env)) {
  if (key.includes('VITE')) {
  	appProps[key] = value;
  }
}

// use gzip to compress response
app.use(compression());

// Enable CORS && IE Edge mode
app.use((req, res, next) => {
	res.setHeader('X-UA-Compatible', 'IE=edge');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set response header to no cache for index.html
const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

// serve dist folder assets and favicon
app.use('/favicon.ico', express.static(`${__dirname}/dist/favicon.ico`));
app.use('/assets', express.static(`${__dirname}/dist/assets`));

// read index.html and inject props serving page from cache
const errorMsg = "<p style='color:red;font-size:16px;padding:15px;font-family:arial,helvetica;'>Node server couldn't find the index.html file. Check to see if you have built the dist folder.</p>";
const html = {text:'', len:0};
html.text = getAppHtml();
html.text = injectProps(html.text);
html.len = html.text.length;

// serve index.html file catching all other urls
app.get(/.*/, nocache, (req, res) => {
	if (html.text) {
		res.writeHead(200, {'Content-Type': 'text/html','Content-Length':html.len});
	} else {
		html.text = errorMsg;
		res.writeHead(500, {'Content-Type': 'text/html','Content-Length':html.text.length});
	}
	res.write(html.text);
	res.end();
});

const nodePort = +process.env.NODE_PORT;
const httpsEnabled = process.env.NODE_HTTPS_ENABLED === 'true';

if (httpsEnabled) {
  let options = {
     pfx: fs.readFileSync(process.env.NODE_CERT_PATH),
     passphrase: process.env.NODE_PASSPHRASE
  };

  https.createServer(options, app).listen(nodePort,() => {
  	console.log('APP_PROPS:',appProps);
  	console.log(`${process.env.VITE_APP_NAME} server is running under HTTPS on port ${nodePort} `);
  });
 
} else {
   app.listen(nodePort, () => {
   	console.log('APP_PROPS:',appProps);
   	console.log(`${process.env.VITE_APP_NAME} server is running under HTTP on port ${nodePort}`);
  });
}

// get page HTML string
function getAppHtml() {
	let html = '';
	try {
		html = fs.readFileSync(`${__dirname}/dist/index.html`, 'utf8');
	} catch (err) {
		console.log("Node server couldn't find the index.html file. Check to see if you have built the dist folder.", err);
	}

	return html;
}

// inject props from ENV process into HTML index.html file
function injectProps(html) {
	let propsStr = "var APP_PROPS={";

	for (let prop in appProps) {
		propsStr+= `${prop}:${parsePropType(appProps[prop])},`
	}

	propsStr = propsStr.slice(0,-1) + '};';

	return html.replace('{APP_PROPS:null}',propsStr);
}

// parse string into type
function parsePropType(propStr) {
	if (propStr === 'true') {
		return true;
	} else if (propStr === 'false') {
		return false;
	} else if (!isNaN(propStr) && propStr.trim() !== '') {
		return +propStr;
	} else if (propStr.trim() === '') {
		return `""`;
	} else {
		return `"${propStr}"`;
	}
}


