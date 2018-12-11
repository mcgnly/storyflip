const multer = require ('multer');
const fs = require('fs');

var storage = multer.memoryStorage();

const uploadApi = app => {
    app.use(multer({ storage: storage }).single('pdf'));
    
    app.post('/save', (req, res) => {
        const fileToUpload = req.file.buffer;
        const {order_id, description} = req.body;
        fs.writeFile(`customerUploads/customerOrder${order_id}.pdf`, fileToUpload, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            console.log('pdf saved!');
        });
    });

    return app;
};

module.exports = uploadApi;
