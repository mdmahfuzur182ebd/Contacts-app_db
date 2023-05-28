const Contact = require("./Contact");

//Query Contacts
module.exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((e) => {
      console.error(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

//Query Contacts by id
module.exports.getSingleContact = (req, res) => {
  let { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

//create contacts
module.exports.createContact = (req, res) => {
  let { name, email, phone } = req.body;
  let contact = new Contact({
    name,
    email,
    phone,
  });
  //console.log(contact);
  contact
    .save()
    .then((c) => {
      res.json(c);
    })
    .catch((e) => {
      console.error(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

//update Contacts
module.exports.updateContact = (req, res) => {
  let { name, email, phone } = req.body;
  let { id } = req.params;

  Contact.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        phone,
      },
    },
    { new: true }
  )
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

// delete contacts
module.exports.deleteContact = (req, res) => {
  let { id } = req.params;
  Contact.findOneAndDelete({ _id: id })
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};
