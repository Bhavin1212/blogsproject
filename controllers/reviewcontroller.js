const review = require('../models/reviewmodel');

const fs = require('fs');

const path = require('path');

module.exports.add_review = async (req, res) => {
    return res.render('add_review')
};

module.exports.insertreview = async (req, res) => {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = review.create(req.body)
        if (data) {
            return res.redirect('/review/views_review')
        } else {
            console.log("review error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.views_review = async (req, res) => {
    if (req.query.status == 'deActive') {
        let Active = await review.findByIdAndUpdate(req.query.id, { isActive: false });
    }
    if (req.query.status == 'Active') {
        let Active = await review.findByIdAndUpdate(req.query.id, { isActive: true });
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
        let data = await review.find({
            $or: [
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { city: { $regex: '.*' + search + '.*', $options: 'i' } },
                { country: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]

        })
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        let countreviewdata = await review.find({
            $or: [
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { city: { $regex: '.*' + search + '.*', $options: 'i' } },
                { country: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let parpagrecords = Math.ceil(countreviewdata / par_page)

        if (data) {
            return res.render('views_review', {
                reviewdata: data,
                PageData: parpagrecords,
                cpage: page,
                search: search
            })
        }
    } catch (error) {

    }
}

module.exports.mulDel = async (req, res) => {
    try {
        let data = req.body.mulDel;
        console.log(data)
        data.forEach(async element => {
        
            await review.findByIdAndDelete(element);
        });
        return res.redirect('/review/views_review');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}

module.exports.deleterecord = async (req, res) => {
    try {
        let data = await review.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/review/views_review')
        } else {
            console.log("review not delete", err);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.updaterecord = async (req, res) => {
    try {
        let data = await review.findById(req.query.id)
        if (data) {
            return res.render('reviewupdate', {
                reviewda: data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.editreview = async (req, res) => {
    let reviewid = req.body.reid
    try {
        let data = await review.findByIdAndUpdate(reviewid, req.body)
        if (data) {
            return res.redirect('/review/views_review')
        } else {
            console.log("update is not find", err);
        }
    } catch (error) {
        console.log(error)
    }
}