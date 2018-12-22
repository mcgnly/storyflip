const multer = require ('multer');
const fs = require('fs');

var storage = multer.memoryStorage();

const uploadApi = app => {
    app.use(multer({ storage: storage }).single('pdf'));
    
    app.post('/save', (req, res) => {
        req.setTimeout(0) // no timeout
        const fileToUpload = req.file.buffer;
        const {order_id, description} = req.body;
        fs.writeFile(`server/customerUploads/${order_id}.pdf`, fileToUpload, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            console.log('pdf saved!');
            res.status(200).send({ success: 'file saved successfully!' });
        });
    });

    return app;
};

module.exports = uploadApi;
