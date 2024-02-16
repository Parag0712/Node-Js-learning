const express = require('express')
const router = express.Router();
const User = require('../models/users')
const multer = require('multer');
const users = require('../models/users');
const fs = require('fs');

// image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
})

var upload = multer({
    storage: storage,
}).single('image');


// get all user route
router.get('/', async (req, res) => {
    try {
        let userData = await users.find()
        res.render('index', {
            title: "Home Page",
            users: userData
        })
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
})

//add router
router.get('/add', (req, res) => {
    res.render('add_user', { title: "Add Users" })
})


// Insert an user into database route 
router.post('/add', upload, async (req, res) => {
    try {
        const user = await users.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.number,
            image: req.file.filename,
        });

        req.session.message = {
            type: 'success',
            message: 'User added successfully',
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});



router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await users.findById(id);
        if (user === null) {
            res.redirect('/');
        } else {
            res.render('edit_user', {
                title: "Edit User",
                users: user
            });
        }
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
})

// update post 

router.post('/update/:id', upload, async (req, res) => {
    let id = req.params.id;
    let new_img = null;

    if (req.file) {
        new_img = req.file.filename;
        try {
            fs.unlinkSync('./uploads' + req.body.old_img);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_img = req.body.old_img;
    }

    try {
        const result = await users.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.number,
            image: new_img
        });

        if (!result) {
            res.json({ message: 'User not found', type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'User updated successfully',
            };
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        res.json({ message: err.message, type: 'danger' });
    }

})

router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await users.findByIdAndDelete(id);

        if (result.image != '') {
            try {
                fs.unlinkSync('./uploads/' + result.image)
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'success',
            message: 'User Deleted successfully',
        };
        res.redirect('/')

    } catch (err) {
        console.error(err);
        res.json({ message: err.message, type: 'danger' });
    }

})

module.exports = router