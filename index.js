const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { error } = require("console");

const app = express();
const port = 8000;

// For parsing JSON data
app.use(express.json());

// For parsing URL-encoded data (if you also need to handle form submissions)
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res)=>{
    const html = `
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users", (req, res)=>{
    return res.json(users)
})

app.post("/api/users", (req, res)=>{
    // create new user
    const body = req.body;
    // console.log("Body", body)
    users.push({ ...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json({ status: "new user add success", id: users.length})
    })
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id)
        return res.json(user);
    })
    .patch((req, res) => {
        // edit the user by id
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        // deleted the user by id
        // const id = Number(req.params.id);
        // const userId = users.find((user)=>user.id === id) 
        // return res.json({ status: "pending" });

        const id = Number(req.params.id);

    // 1. Read the JSON file
    fs.readFile('./MOCK_DATA.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send('Error deleting user.');
        }

        try {
            let users = JSON.parse(data);

            // 2. Find the user to delete
            const userIndex = users.findIndex(user => user.id === id);

            if (userIndex === -1) {
                return res.status(404).send('User not found.');
            }

            // 3. Delete the user from the array
            users.splice(userIndex, 1);

            // 4. Write the updated data back to the file
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), 'utf8', (err) => {  //null, 2 for formatted json
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).send('Error deleting user.');
                }

                res.status(200).send('User deleted successfully.');
            });

        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return res.status(500).send('Error deleting user.');
        }
    });
    })

app.listen(port,()=>console.log(`server run on port: ${port}`))