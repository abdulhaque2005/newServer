const express = require("express");
const cors =require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const user = [
    { "attendence": 96, "uid": 108444, "sub": 14, "bonus": 20, name: "amit" },
    { "attendence": 76, "uid": 108474, "sub": 34, "bonus": 22, name: "amrit" },
    { "attendence": 86, "uid": 108473, "sub": 24, "bonus": 21, name: "aman" },
]


app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.get("/user", (req, res) => {
    res.status(200).json(user);
});


app.get("/user/:uid", (req, res) => {

    let uid = user.find((s) =>
        s.uid === Number(req.params.uid)
    )

    if (!uid) {
        res.status(404).json("UID  is not found!");
    }
    res.status(200).json(uid);

})




app.post("/users", (req, res) => {

    const newProduct = req.body;

    user.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });

});

app.put("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const index = user.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    user[index] = {
        uid: userId,
        attendence: req.body.attendence,
        sub: req.body.sub,
        bonus: req.body.bonus,
        name: req.body.name
    };

    res.status(200).json({
        message: "User replaced",
        user: user[index]
    });
});





app.patch("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user1 = user.find(u => u.uid === userId);

  if (!user1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user1.name = req.body.name;
  if (req.body.bonus) user1.bonus = req.body.bonus;
  if (req.body.attendence) user1.attendence = req.body.attendence;
  if (req.body.sub) user1.sub = req.body.sub;

  res.status(200).json({
    message: "User updated",
    user1
  });
});









app.listen(1000, () => {
    console.log("Server started on port 1000");
});


