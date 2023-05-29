const Contact = require("./Contact");

//Query Contacts
module.exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.render("index", { contacts, error: {} });
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
  let { name, email, phone, id } = req.body;

  let error = {};

  if (!name) {
    error.name = "Please Provide A Name";
  }

  if (!phone) {
    error.phone = "Please Provide A Phone Number";
  }
  if (!email) {
    error.email = "Please Provide An Email";
  }

  let isError = Object.keys(error).length > 0;

  if (isError) {
    Contact.find()
      .then((contacts) => {
        return res.render("index", { contacts, error });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          message: "Error Occurred",
        });
      });
  }
  if (id) {
    Contact.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    )
      .then(() => {
        Contact.find()
        .then((contacts) => {
          res.render("index", { contacts, error: {} });
        });
      })
      .catch((e) => {
        console.error(e);
        return res.json({
          message: "Error Occurred",
        });
      });
  } else {
    let contact = new Contact({
      name,
      email,
      phone,
    });

    contact
      .save()
      .then(() => {
        Contact.find().then((contacts) => {
          return res.render("index", { contacts, error: {} });
        });
      })
      .catch((e) => {
        console.error(e);
        return res.json({
          message: "Error Occurred",
        });
      });
  }
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
    .then(() => {
      Contact.find().then((contacts) => {
        res.render("index", { contacts, error: {} });
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};
