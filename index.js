const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server running for node-api2-project");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "No posts with that id" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/api/posts", (req, res) => {
  const postInfo = req.body;
  console.log(postInfo);

  db.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const postInfo = req.body;

  db.update(id, postInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Cannot update non-existent post" })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

const port = 5001;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));