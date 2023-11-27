const http = require("http");
const fs = require("fs");
const fsExtra = require("fs-extra");
const process = require("child_process");
const { nanoid } = require("nanoid");


async function createService(req, res) {
    const newUserID = nanoid();
    const floderPath = `./server/vueProjects/${newUserID}`;

    const floderCreateRes = await new Promise((res, rej) => {
        fs.mkdir(floderPath, err => {
            if (!err) {
                res(true);
            } else {
                rej(false);
            }
        });
    });

    if (!floderCreateRes) {
        res.end(JSON.parse({
            status: 500,
            msg: "get err when creating floder"
        }));

        return ;
    }

    const currentPath = process.cwd();

    try {
        process.chdir(floderPath);
    } catch {
        res.end(JSON.parse({
            status: 500,
            msg: "chang floder failed"
        }));

        return ;
    }

    await new Promise((res, rej) => {
        const createProjectProcess = process.spawn("");
    });

    process.chdir(currentPath);
}




const server = http.createServer(async (req, res) => {
    const route = req.url;

    if (route === "/heartbeat") {

    }
    else if (route === "/createService") {
        await createService(req, res);
    }

    res.end("Hello!");
});

server.listen(4321, () => {
    console.log("simpleDesigner Server Running at port: 4321");
});
