const {sendFreeDownloadEmail} = require('./email');

const downloadApi = app => {
    app.post('/save-free', (req, res) => {
        sendFreeDownloadEmail().catch(console.error);
        res.status(200).end();
    });
    return app;
};

module.exports = downloadApi;
