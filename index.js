const express = require("express");
const app = express()
app.use(express.json())

let userList = [
    {
        id: 1,
        name: 'Octane',
        ult: 'Jump Pad',
        fun: true,
    },
    {
        id: 2,
        name: 'Crypto',
        ult: 'Drone EMP',
        fun: true,
    },
    {
        id: 3,
        name: 'Wattson',
        ult: 'Pylon',
        fun: false,
    },
    {
        id: 4,
        name: 'Fuse',
        ult: 'Fire Works',
        fun: true,
    }
]

app.get("/legends", (req, res) => {
    res.json(userList);
});

app.post("/legends", (req, res) => {
    const newLegend = req.body;
    userList.push(newLegend);
    res.json(userList);
});

app.put("/legends/:id", (req, res) => {
    let updatedLegend = findLegendById(req.params.id);

    if (updatedLegend == null){
        res.send("Legend Id returned null, please update and try request again");
    }
    else {
        let newName = req.body.newName;
        updatedLegend.name = newName;
        res.json(updatedLegend);
    }
    
});

app.delete("/deletelegend/:id", (req, res) => {
    const legendId = req.params.id;
    const legendToDelete = findLegendById(legendId);

    if(legendToDelete == null){
        res.send("Legend not found. Please try again.");
    }
    else {
        userList.splice(legendId-1, 1);
        console.log("Removed " + legendToDelete.name);
        res.json(userList);
    }
});

function findLegendById(id) {
    let legend = null;

    for(let i = 0; i < userList.length; i++){
        const currentLegend = userList[i];
        if(currentLegend.id == id) {
            legend = currentLegend;
            return legend;
        }
    }
    return legend;
    }

// TODO: Need to be able to delete appropriate legend, when array is no longer max size
function deleteLegend(id) {
    const legendId = id;
    const legendToDelete = findLegendById(legendId);

    if(legendToDelete == null){
        res.send("Legend not found. Please try again.");
    }
    else {
        userList.splice(legendId-1, 1);
        console.log("Removed " + legendToDelete.name);
        res.json(userList);
    }
}
    
app.listen('3001', () => {
    console.log('Server Running Fast As Usain Bolt!')
});