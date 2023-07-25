
var VideoCapture=require('camera-capture').VideoCapture;
const fs = require('fs');
const ftp = require('./ftp');
var url;
var port;
var user;
var password;

process.argv.forEach(function (val, index, array) {
    switch (index) {
        case 2:
            url=val;
            break;
        case 3:
            port=parseInt(val)
            break;
        case 4:
            user=val;
            break;
        case 5:
            password=val;
            break;    
    
        default:
            break;
    }
});
console.log(url,port,user,password);

const client = new ftp(url,port, user, password, true);

const c = new VideoCapture({
  mime: 'image/png',
  width: 240,
  height: 160,
})
async function go(){
    await c.initialize()
    while (true) {
        let f = await c.readFrame()    
        fs.writeFileSync('tmp.png', f.data);  
        // var start = +new Date();  // log start timestamp
        await client.upload('./tmp.png', 'www/stream.png', 755);
        // var end =  +new Date();  // log end timestamp
        // var diff = end - start; 
        // console.log(diff);
    };  
}

go();