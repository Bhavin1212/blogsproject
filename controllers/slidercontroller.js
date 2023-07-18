const { match } = require('assert');
const slider = require('../models/slidermodel')

const fs = require('fs');

const path = require('path')

module.exports.addslider = async (req, res) => {
    return res.render('add_slider')
}

module.exports.insertslider = async (req, res) => {
    try {
        let img = slider.sliderpath + "/" + req.file.filename
        req.body.image = img;

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await slider.create(req.body)
        if (data) {
            return res.redirect('/slider')
        } else {
            console.log("slider data error");
        }
    } catch (error) {

    }
}

module.exports.viewslider = async (req, res) => {
    try {
        if (req.query.status == 'deActive') {
            let Active = await slider.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await slider.findByIdAndUpdate(req.query.id, { isActive: true });
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

        let sliderdata = await slider.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { Content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]

        })
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        let countsliderdata = await slider.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { Content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let parpagrecords = Math.ceil(countsliderdata / par_page)

        if (sliderdata) {
            return res.render('views_slider', {
                sliderrecords: sliderdata,
                PageData: parpagrecords,
                cpage: page,
                search: search

            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.mulDel = async (req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async element => {
            let id_data = await slider.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await slider.findByIdAndDelete(element);
        });
        return res.redirect('/slider/views_slider');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}

module.exports.deleterecord = async (req, res) => {
    try {
        let data = await slider.findById(req.params.id)
        if (data) {
            let img = path.join(__dirname, '..', data.image);
            if (img) {
                fs.unlinkSync(img);
            }
            let delet = await slider.findByIdAndDelete(req.params.id);
            if (delet) {
                res.redirect('/slider/views_slider')
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.updaterecord = async (req, res) => {
    try {
        let record = await slider.findById(req.query.id)
        if (record) {
            return res.render('sliderupdate', {
                singleadmin: record
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.editslider = async (req, res) => {
    let sliderid = req.body.editslider
    try {
        if (req.file) {
            let data = await slider.findById(sliderid)
            if (data) {
                var sliderimg = path.join(__dirname, '..', data.image)
                if (sliderimg) {
                    fs.unlinkSync(sliderimg)
                }

                var newimg = slider.sliderpath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await slider.findByIdAndUpdate(sliderid, req.body)
                if (record) {
                    return res.redirect('/slider/views_slider')
                } else {
                    console.log("data not update");
                }
            }
        } else {
            let data = await slider.findById(sliderid)
            if (data) {
                req.body.image = data.image;

                let record = await slider.findByIdAndUpdate(sliderid, req.body)
                if (record) {
                    return res.redirect('/slider/views_slider')
                } else {
                    console.log("data not update");
                }
            } else {
                console.log("data not update");
            }
        }
    } catch (err) {
        console.log(err);
    }
}

