const express = require("express");
const cors = require("cors");

const generalRouter = require("./app/routes/general.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
    res.send({message: "Xin chao den muon sach"});
});

app.use("/api/contacts", generalRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});


// app.use((err, req, res, next) => {
//     return res.status(error.statusCode || 500).json({
//     message: error.message || "Internal Server Error",
//     });
// });

module.exports = app;