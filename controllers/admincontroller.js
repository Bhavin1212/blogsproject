const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');


module.exports.login = (req, res) => {
    return res.render('login');
}

module.exports.dashborad = async (req, res) => {
    return res.render('Dashborad');
}

module.exports.logindata = async (req, res) => {
    return res.redirect('/dashborad');
}

module.exports.Logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            return res.redirect('/')
        }
    });
}

module.exports.password = async (req, res) => {
    return res.render('password');
}

module.exports.modifypassword = async (req, res) => {
    try {
        if (await bcrypt.compare(req.body.cpass, req.user.password)) {

            if (req.body.cpass != req.body.npass) {
                if (req.body.npass == req.body.copass) {
                    let pass = await bcrypt.hash(req.body.npass, 10);
                    console.log(pass);
                    let newpass = await Admin.findByIdAndUpdate(req.user.id, {
                        password: pass
                    });
                    if (newpass) {
                        return res.redirect('/logout')

                    } else {
                        console.log("new password not mach");
                        return res.redirect('back')
                    }
                } else {
                    console.log("npass and copass in not mach");
                }
            } else {
                console.log("npass and cupass is same");
                return res.redirect('back')
            }
        } else {
            console.log("currant password  is not mach");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.profile = async (req, res) => {
    return res.render('profile')
}

module.exports.readmore = async (req, res) => {
    return res.render('readmore')
}

module.exports.viewadmin = async (req, res) => {
    let adminData = await Admin.find({});
    return res.render('views_admin', {
        'Allrecords': adminData
    });
}

module.exports.addadmin = async (req, res) => {
    return res.render('add_admin');
}

module.exports.insartrecord = async (req, res) => {

    var imagePath = '';
    if (req.file) {
        imagePath = Admin.avatarPath + "/" + req.file.filename;
    }
    req.body.image = imagePath;
    req.body.name = req.body.fname + " " + req.body.lname;

    let pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = pass

    var date = new Date();
    req.body.date = date.toLocaleDateString();


    Admin.create(req.body)
        .then(function (data) {
            return res.redirect('/dashborad');
        })
        .catch(function (err) {
            console.log(err);
        })
}
module.exports.deleterecord = async (req, res) => {
    try {
        let data = await Admin.findById(req.params.id)
        if (data) {
            let img = path.join(__dirname, '..', data.image);
            if (img) {
                fs.unlinkSync(img);
            }
            let delet = await Admin.findByIdAndDelete(req.params.id);
            if (delet) {
              return res.redirect('/views_admin')
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.updaterecord = (req, res) => {
    Admin.findById(req.query.id)

        .then((record) => {
            return res.render('update', {
                'singleadmin': record,
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports.editrecord = (req, res) => {
    let adminId = req.body.editid;

    if (req.file) {
        Admin.findById(adminId)
            .then((oldrecord) => {

                var imgPath = path.join(__dirname, "..", oldrecord.image);
                if (imgPath) {
                    fs.unlinkSync(imgPath);
                }

                var newPath = Admin.avatarPath + '/' + req.file.filename;
                req.body.image = newPath;

                req.body.name = req.body.fname + " " + req.body.lname;


                Admin.findByIdAndUpdate(adminId, req.body)
                    .then((record) => {
                        return res.redirect('/views_admin');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else {
        Admin.findById(adminId)
            .then((oldrecord) => {
                req.body.image = oldrecord.image;

                req.body.name = req.body.fname + " " + req.body.lname;

                Admin.findByIdAndUpdate(adminId, req.body)
                    .then((updateRecord) => {
                        return res.redirect('/views_admin');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
    }
}