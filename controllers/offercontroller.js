const offer = require('../models/offermodel');

const path = require('path');


module.exports.add_offer = async (req, res) => {
    return res.render('add_offer')
}

module.exports.insertoffer = async (req, res) => {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await offer.create(req.body)
        if (data) {
            return res.redirect('/offer/add_offer')
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.views_offer = async (req, res) => {

    try {
        if (req.query.status == 'deActive') {
            let Active = await offer.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await offer.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        var page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        var par_page = 2;

        let data = await offer.find({
            $or: [
                { icon: { $regex: '.*' + search + '.*', $options: 'i' } },
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]

        })
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        let countofferdata = await offer.find({
            $or: [
                { icon: { $regex: '.*' + search + '.*', $options: 'i' } },
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let parpagrecords = Math.ceil(countofferdata / par_page)

        if (data) {
            return res.render('views_offer', {
                offerdata: data,
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


            await offer.findByIdAndDelete(element);
        });
        return res.redirect('/offer/views_offer');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}

module.exports.deleterecord = async (req, res) => {
    try {
        let data = await offer.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/offer/views_offer')
        } else {
            console.log("offer not delete", err);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.updaterecord = async (req, res) => {
    try {
        let data = await offer.findById(req.query.id)
        if (data) {
            return res.render('offerupdate', {
                offerda: data
            })
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports.updatetoffer = async (req, res) => {
    let offerid = req.body.oid
    try {
        let data = await offer.findByIdAndUpdate(offerid, req.body)
        if (data) {
            return res.redirect('/offer/views_offer')
        } else {
            console.log("update is not find");
        }
    } catch (error) {
        console.log(error)
    }
}