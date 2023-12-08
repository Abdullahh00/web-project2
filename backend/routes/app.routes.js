let express = require("express");
let router = express.Router();


let User = require("../Models/User");
let Admin = require("../Models/Admin");
let Product = require("../Models/Products");
let License = require("../Models/License");


router.get("/api/products/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findOne({ _id: productId });

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



router.post("/api/users/register", async (req, res) => {
    try {
        let newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/api/getusers", async (req, res) => {
    try {
        let users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post("/api/users/login", async (req, res) => {
    console.log("hey");
    try {
       
        let user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (user) {
            res.status(200).send({ message: "User logged in successfully" });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post("/api/admins/login", async (req, res) => {
    console.log("hey admin");
    try {
        let admin = await Admin.findOne({ email: req.body.email, password: req.body.password });
        if (admin) {
            res.status(200).send({ message: "User logged in successfully" });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get("/api/users/:userId", async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post("/api/products", async (req, res) => {
    try {
        let newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.put("/api/products/:productId", async (req, res) => {
    try {
        let updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (updatedProduct) {
            res.status(200).send(updatedProduct);
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get("/api/products", async (req, res) => {
    try {
        let products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete("/api/products/:productId", async (req, res) => {
    try {
        let deletedProduct = await Product.findByIdAndRemove(req.params.productId);
        if (deletedProduct) {
            res.status(200).send({ message: "Product deleted successfully" });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



router.post("/api/licenses", async (req, res) => {
    try {
        let newLicense = new License(req.body);
        await newLicense.save();
        res.status(201).send(newLicense);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get("/api/licenses", async (req, res) => {
    try {
        let licenses = await License.find({});
        res.status(200).send(licenses);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



router.put("/api/licenses/:licenseId", async (req, res) => {
    try {
        let updatedLicense = await License.findByIdAndUpdate(req.params.licenseId, req.body, { new: true });
        if (updatedLicense) {
            res.status(200).send(updatedLicense);
        } else {
            res.status(404).send({ message: "License not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete("/api/licenses/:licenseId", async (req, res) => {
    try {
        let deletedLicense = await License.findOneAndDelete(req.params.licenseId);
        if (deletedLicense) {
            res.status(200).send({ message: "License deleted successfully" });
        } else {
            res.status(404).send({ message: "License not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



router.post("/api/licenses/activate", async (req, res) => {
    try {
        let license = await License.findOne({ licensekey: req.body.licensekey });
        if (license && !license.activationstatus) {
            license.activationstatus = true;
            license.issuedto = req.body.issuedto; 
            await license.save();
            res.status(200).send({ message: "License activated successfully" });
        } else {
            res.status(400).send({ message: "Invalid or already activated license" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/api/licenses/status/:licenseKey", async (req, res) => {
    try {
        let license = await License.findOne({ licensekey: req.params.licenseKey });
        if (license) {
            res.status(200).send({ activationstatus: license.activationstatus });
        } else {
            res.status(404).send({ message: "License not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/api/licenses/activate1", async (req, res) => {
    try {
        const { licenseKey } = req.body;
        console.log("Activating license with key:", licenseKey); // Add this line for debugging
        let license = await License.findOne({ licensekey: licenseKey });

        if (!license) {
            res.status(404).send({ message: "License key not found" });
        } else if (license.activationstatus === false) {
            console.log("Activating license...");
            license.activationstatus = true;
            license.issuedto="654f63faa652ea80c7032383";
            await license.save();
            res.status(200).send({ message: "License activated successfully" });
        } else if (license.activationstatus === true) {
            console.log("License is already activated");
            res.status(400).send({ message: "License is already activated" });
        } else if (license.activationstatus === undefined) {
            console.log("Invalid license data");
            res.status(400).send({ message: "Invalid license data" });
        }
    } catch (error) {
        console.error("Error activating license:", error); // Add this line for debugging
        res.status(500).send({ message: error.message });
    }
});



module.exports = router;
