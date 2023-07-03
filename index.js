const express = require('express');

const app = express();

app.use(express.json());

app.disable('x-powered-by')

const key = "TeHVyee453GSjdjuSHhdKSh3837dJS73j738Hdjh7838djhs389Hjshdh"
const CheckAuth = async function (req, res, next) {

    const header = req.headers.auth

    if (header) {

        if (header == key) {


            next()

        } else {
            res.status(404).send(
                {
                "Message": "Wrong key"
                }
            )
        }

    } else {
        res.status(404).send(
            {
            "Message": "No header auth"
            }
        )
    }

}

app.use(CheckAuth)

const PORT = process.env.PORT || 3000;

//const server = app.listen(PORT, () => { console.log(`It Is ready to rock http://localhost:${PORT}`); });


var Relay = [
    {gadegetName: "valve1", gadgetState: true},
    {gadegetName: "valve2", gadgetState: true}
]

var dates = [
    {
        Id: "5C3E783A-6CBD-4163-9019-CC519BFC92BA",
        Name: "Test",
        Time: {Hour: 14, Minutes: 30},
        DurationH: 2,
        DurationS: 0,
        DurationM: 3,
        onDate: false,
        Date: {Day: 30, Month: 6, Year: 2023},
        Gadget: "valve2"
    },
]

function switchcase(body) {

    const index = Relay.findIndex(item => item.gadegetName === body.Relay);

    if (Relay[index].gadgetState == true){
        Relay[index].gadgetState = false
    } else {
        Relay[index].gadgetState = true
    }

}

console.log(Relay)

switchcase({ Relay: "valve1" })

console.log(Relay)
// Define a route for handling the GET request
app.post('/:case', (req, res) => {


  const requestCase = parseInt(req.params.case)

  const requestData = req.body;

  console.log("Case ", requestCase, ", Data ", requestData)


  switch (requestCase) {
    case 1:
        switchcase(requestData);
        res.status(200).send(JSON.stringify({Relay: Relay}));
        break;
    case 2:
        res.status(200).send(JSON.stringify({Relay: Relay}));
        break;
    case 3:
        res.status(200).send(JSON.stringify({Relay: Relay}));
        break;
    case 4:
        res.status(200).send(JSON.stringify({Dates: dates}));
        break;
    case 5:
        dates.push(requestData.Date)

        res.status(200).send(JSON.stringify({Dates: dates}));
        break;
    case 6:
        const index = dates.findIndex(item => item.Id === requestData.Id);

        dates.splice(index, 1);

        res.status(200).send(JSON.stringify({Dates: dates}));
        break;
    default:
        res.status(200).send("error");
        break;
  }
  
});

console.error()