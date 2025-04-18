const server = require("express")();
const cors = require("cors");
const port = 23456;
server.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

process.env.BASEDIR = process.cwd();

server.use("/api", require("./routes"));

server.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
