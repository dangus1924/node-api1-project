const express = require('express')
let users = require('./data/db.js')

const app = express()
 
app.use(express.json())

app.get("/", (req, res) => {
	res.send("Hey man");
  });
  
  app.post("/api/users", (req, res) => {
	const { name, bio } = req.body;
  
	if (!name || !bio) {
	  res
		.status(400)
		.json({ error: "Please enter a name and a bio for the user" });
	} else {
	  users
		.insert(req.body)
		.then(user => {
		  res.status(201).json(user);
		})
		.catch(error => {
		  res
			.status(500)
			.json({ error: "There was an error processing your request" });
		});
	}
  });
  
  app.get("/api/users", (req, res) => {
	users
	  .find()
	  .then(users => {
		res.status(200).json(users);
	  })
	  .catch(err => {
		res.status(500).json({
		  err,
		  err: "the users information could not be retrieved"
		});
	  });
  });
  
  app.get("/api/users/:id", (req, res) => {
	const { id } = req.params;
	users
	  .findById(id)
	  .then(user => {
		if (user) {
		  res.status(200).json(user);
		} else {
		  res
			.status(404)
			.json({ message: "The user with the specified ID does not exist" });
		}
	  })
	  .catch(error => {
		res
		  .status(500)
		  .json({ error, error: "The user information could not be retrieved." });
	  });
  });
  
  app.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;
  
	users
	  .remove(id)
	  .then(count => {
		if (count && count > 0) {
		  res.status(200).json({
			message: "The user was deleted"
		  });
		} else {
		  res.status(404).json({
			message: "The user with the specified ID does not exist."
		  });
		}
	  })
	  .catch(error => {
		res.status(500).json({ error, error: "The user could not be removed" });
	  });
  });
  
  app.put("/api/users/:id", (req, res) => {
	const { name, bio } = req.body;
	const { id } = req.params;
  
	if (!name || !bio) {
	  res.status(400).json({ error: "please provide name and bio for the user" });
	} else {
	  users
		.update(id, req.body)
		.then(user => {
		  if (user) {
			res.status(200).json(req.body);
		  } else {
			res.status(404).json({
			  message: "the user with the specified ID does not exist"
			});
		  }
		})
		.catch(error => {
		  res.status(500).json({ error, error: "The user could not be updated" });
		});
	}
  });
  
  app.listen(8080, () =>
	console.log("Welcome you are in a safe place")
  );