var express = require("express");
const society = require("../db/models/society");
var router = express.Router();
var logger = require("../utils/logger").getLoggerByName("API LOGGER");
const visitorCount = require("../db/models/count").visitorCount;
var cors = require("cors");
const userModel = require("../db/models/user");
const axios = require("axios");
const InventoryItem = require("../db/models/inventoryitems");

// var allowlist = ['http://localhost:5173/', 'https://mscs.vercel.app/']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

const test = (req, res, next) => {
    next();
};

const myHeaders = new Headers();

myHeaders.append(
    "Authorization",
    "Bearer ya29.a0AfB_byBk2QV8ATPsPK-GTWVQ88zJuoiSY-FmMIKZP-wFNBuqF9Wrdl2tEVS5ZhHCjYgHcD2-BTvD7ct9rBBnhJm4fQ2wXFv-NWXdq6RMY10_rBwJ6JAUXp62VszpioneBPYNM9MfEV8AgwqOfRsdapecOtptSPpZO-IJFhvg4ElNNlN9jfSMC_Z_07LlyM6mdokskzUR6DfQ5KlDRj2CnETxnnw-TIs_zKtTQTrEQJmMFAiXf-RLVJa7kJStMNXtcgQpwaBYCpAjWqvFRfBSXDvzJjkXRcaLkxGCD5jspmpSdfHKbk2YtjdoCrgQqGQF2UvW4kFC3knyGgxkVKQsV7YrG4kow2o5LLfEkXaSbwocROY2mkLEdItZ9VFYlRyeFk3_VOdRbS5vuvyOLyfU1Vz4asNjj58aCgYKAdcSARASFQHGX2MidOHGscLxkBEInyw51pYfXQ0422"
);
myHeaders.append("Content-Type", "application/json; charset=utf-8");

router.post("/image/summarize", async (req, res) => {
    try {
        const { image } = req.body;

        const raw = {
            instances: [
                {
                    image: {
                        bytesBase64Encoded: image,
                    },
                },
            ],
            parameters: {
                sampleCount: 1,
                language: "en",
            },
        };

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const { response } = await axios.post(
            "https://asia-southeast1-aiplatform.googleapis.com/v1/projects/quiet-subset-415315/locations/asia-southeast1/publishers/google/models/imagetext:predict",
            requestOptions
        );
        // fetch("https://asia-southeast1-aiplatform.googleapis.com/v1/projects/quiet-subset-415315/locations/asia-southeast1/publishers/google/models/imagetext:predict", requestOptions)
        //     .then((response) => {
        //         return res.status(200).json({
        //             message: "Success",
        //             code: "SUCCESS",
        //             data: response.text()
        //         });
        //     })
        //     .then((result) => console.log(result))
        //     .catch((error) => console.error(error));
        console.log(response);
        return res.status(200).json({
            message: "Success",
            code: "SUCCESS",
            data: response.text(),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            code: "FAIL",
            error: err,
        });
    }
});

// ,cors(corsOptionsDelegate)
router.get("/", test, async (req, res) => {
    return res.status(200).json({
        message: "Hello World!",
    });
});

router.post("/user/register", test, async (req, res) => {
    try {
        const { username, password, employeeCode, role } = req.body;
        const user = await userModel.create({
            username,
            password,
            employeeCode,
            role,
        });
        console.log("USER", user);
        user["password"] = undefined;
        return res.status(200).json({
            message: "Hello World!",
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server Error",
            code: "FAIL",
        });
    }
});

router.get("/user/login", test, async (req, res) => {
    const { username, password } = req.body;
    console.log("USERNAME", username, "PASSWORD", password);
    const user = await userModel.findOne({
        username,
        password,
    });
    console.log("USER", user);
    if (user) {
        user["password"] = undefined;
        return res.status(200).json({ code: "SUCCESS", data: user });
    } else
        return res.status(401).json({
            message: "Invalid Credentials",
            code: "FAIL",
        });
});

router.get("/user/all", test, async (req, res) => {
    let data = await userModel.find({});
    let n = 1;
    const result = [];
    for await (let i of data) {
        result.push({
            SNO: n++,
            NAMEOFSOCIETY: i.name_of_society,
            STATE: i.state,
            DISTRICTNAME: i.district,
            DATE: new Date(i.dateOfRegistration).toDateString(),
            TYPENAME: i.sector_type,
        });
    }

    return res.status(200).json({
        message: "Hello World!",
        data: result,
    });
});

router.get("/society/states", test, async (req, res) => {
    let data = await society.find({});
    let state = new Set();
    for await (let i of data) {
        state.add(i.state);
    }
    let arr = Array.from(state);
    let stateData = [];
    for (let i of arr) {
        stateData.push({
            label: i,
            value: i,
        });
    }

    return res.status(200).json({
        message: "Hello World!",
        data: stateData,
    });
});

router.get("/society/all", test, async (req, res) => {
    let data = await society.find({});
    let n = 1;
    const result = [];
    for await (let i of data) {
        result.push({
            SNO: n++,
            NAMEOFSOCIETY: i.name_of_society,
            ADDRESS: i.address,
            STATE: i.state,
            DISTRICTNAME: i.district,
            DATE: new Date(i.dateOfRegistration).toDateString(),
            TYPENAME: i.sector_type,
        });
    }

    return res.status(200).json({
        message: "Hello World!",
        data: result,
    });
});

router.get("/sector-wise-count", test, async (req, res) => {
    let data = await society.find({});
    let sector = {};
    for await (let i of data) {
        if (sector[i.sector_type]) {
            sector[i.sector_type] = sector[i.sector_type] + 1;
        } else {
            sector[i.sector_type] = 1;
        }
    }
    logger.info("CHECK THIS ANNA", sector);
    const result = [];
    for (let i in sector) {
        result.push({
            state: i,
            count: sector[i],
        });
    }
    return res.status(200).json({
        message: "Hello World!",
        data: result,
    });
});

router.get("/year-wise-count", test, async (req, res) => {
    let data = await society.find({});
    let year = {};
    for await (let i of data) {
        if (i.dateOfRegistration) {
            let y = i.dateOfRegistration.getFullYear();
            if (year[y]) {
                year[y] = year[y] + 1;
            } else {
                year[y] = 1;
            }
        }
    }
    const result = [];
    for (let i in year) {
        result.push({
            state: i,
            count: year[i],
        });
    }
    return res.status(200).json({
        message: "Hello World!",
        data: result,
    });
});

router.get("/visitor-count", test, async (req, res) => {
    const count = await visitorCount.findOne({});
    if (count) {
        count.count = count.count + 1;
        await count.save();
    } else {
        await visitorCount.create({
            count: 1,
        });
    }
    return res.status(200).json({
        message: "Hello World!",
        data: count,
    });
});

router.get("/state-wise-count", test, async (req, res) => {
    let data = await society.find({});
    let state = {};
    for await (let i of data) {
        if (state[i.state]) {
            state[i.state] = state[i.state] + 1;
        } else {
            state[i.state] = 1;
        }
    }
    const result = [];
    for (let i in state) {
        result.push({
            state: i,
            count: state[i],
        });
    }
    return res.status(200).json({
        message: "Hello World!",
        data: result,
    });
});

router.get("/populate", test, async (req, res) => {
    let c = 0;
    // await society.deleteMany({})
    // for await(let i of realData){
    //   let date = null;
    //   let stringDate = i.date_of_registration;
    //   if(stringDate){
    //     var dateString = stringDate;
    //     var dateParts = dateString.split("-");
    //     var year = parseInt(dateParts[0]);
    //     var month = parseInt(dateParts[1]) - 1; // JavaScript months are zero-based
    //     var day = parseInt(dateParts[2]);
    //     date = new Date(year, month, day);
    //   }

    //   await society.create({
    //     sr_no : i.sr_no,
    //     name_of_society : i.name_of_society,
    //     address : i.address,
    //     state : i.state,
    //     district : i.district,
    //     dateOfRegistration : date,
    //     areaOfOperation : i.area_of_operation,
    //     sector_type : i.sector_type
    //   })
    //       logger.info("CREATED FOR " + c++);
    // }

    //  await userModel.deleteMany({})
    // for await(let i of real){
    //   let date = null;
    //   let stringDate = i['User Reg. Date'];
    //   if(stringDate){
    //     var dateString = stringDate;
    //     // var dateParts = dateString.split("-");
    //     // var year = parseInt(dateParts[0]);
    //     // var month = parseInt(dateParts[1]) - 1; // JavaScript months are zero-based
    //     // var day = parseInt(dateParts[2]);
    //     date = new Date(dateString);
    //   }

    //   await userModel.create({
    //     sr_no : i['S No'],
    //     name_of_society : i.Name,
    //     // address : i.address,
    //     state : i.State,
    //     district : i.District,
    //     dateOfRegistration : date,
    //     // areaOfOperation : i.area_of_operation,
    //     sector_type : i['Society Type']
    //   })
    //       logger.info("CREATED FOR " + c++);
    // }
    let data = await society.find({});
    return res.status(200).json({
        message: "Hello World!",
        data: data,
    });
});

router.get("/inventoryItems", async (req, res) => {
    try {
        const inventoryItems = await InventoryItem.find({});
        return res.status(201).json(inventoryItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// POST request API
router.post("/inventoryItems", async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        const inventoryItem = new InventoryItem({ name, quantity, price });
        await inventoryItem.save();
        return res.status(201).json(inventoryItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
