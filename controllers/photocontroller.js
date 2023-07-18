const photo = require('../models/photosmodel');

const fs = require('fs');

const path = require('path');

module.exports.add_photos = async (req, res) => {
    return res.render('add_photos');
}

module.exports.insertphoto = async (req, res) => {
    try {
        let img = photo.photopath + "/" + req.file.filename
        req.body.image = img;

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await photo.create(req.body)
        if (data) {
            return res.redirect('/photo/views_photo')
        } else {
            console.log("photo data error");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.viewphoto = async (req, res) => {
    
    if (req.query.status == 'deActive') {
        let Active = await photo.findByIdAndUpdate(req.query.id, { isActive: false });
    }
    if (req.query.status == 'Active') {
        let Active = await photo.findByIdAndUpdate(req.query.id, { isActive: true });
    }

    var search = '';
    if (req.query.search) {
        search = req.query.search;
    }

    var page = 1;
    if (req.query.page) {
        page = req.query.page;
    }
    var par_page = 3;

    try {
        let record = await photo.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]

        })
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        let countphotodata = await photo.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let parpagrecords = Math.ceil(countphotodata / par_page)

        if (record) {
            return res.render('views_photo', {
                photorecords: record,
                PageData: parpagrecords,
                cpage: page,
                search: search
            })
        } else {
            console.log("recent view error");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.mulDel = async (req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async element => {
            let id_data = await photo.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await photo.findByIdAndDelete(element);
        });
        return res.redirect('/photo/views_photo');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}

module.exports.deleterecord = async (req, res) => {
    try {
        let data = await photo.findById(req.params.id)
        if (data) {
            let img = path.join(__dirname, '..', data.image);
            if (img) {
                fs.unlinkSync(img);
            }
            let delet = await photo.findByIdAndDelete(req.params.id);
            if (delet) {
                res.redirect('/photo/views_photo')
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.updaterecord = async (req, res) => {
    try {
        let data = await photo.findById(req.query.id)
        if (data) {
            return res.render('photoupdate', {
                photodata: data
            })
        } else {
            console.log("update err");
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports.editphoto = async (req, res) => {
    let recenid = req.body.photoid;
    try {
        if (req.file) {
            let data = await photo.findById(recenid)
            if (data) {
                var recentimg = path.join(__dirname, '..', data.image)
                if (recentimg) {
                    fs.unlinkSync(recentimg)
                }

                var newimg = photo.photopath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await photo.findByIdAndUpdate(recenid, req.body)
                if (record) {
                    return res.redirect('/photo/views_photo')
                } else {
                    console.log("data is not update");
                }
            }
        } else {
            let data = await photo.findById(recenid)
            if (data) {
                req.body.image = data.image

                let record = await photo.findByIdAndUpdate(recenid, req.body)
                if (record) {
                    return res.redirect('/photo/views_photo')
                } else {
                    console.log("data is not update");
                }
            } else {
                console.log("data error");
            }
        }
    } catch (error) {
        console.log(error);
    }
}
