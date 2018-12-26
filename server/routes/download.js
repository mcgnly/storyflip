const downloadApi = app => {
    app.post('/save-free', (req, res) => {
        res.status(200).end();
    });
    return app;
};

module.exports = downloadApi;
