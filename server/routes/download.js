const downloadApi = app => {
    app.post('/save-free', (req, res) => {
        res.status(200);
    });
    return app;
};

module.exports = downloadApi;
