const comment = require('../models/commentmodel');

const path = require('path');

module.exports.com_insert = async (req,res)=>{
    try {
        let anyDate = new Date(1528578000000);
        req.body.date =  anyDate.toShortFormat();

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await comment.create(req.body);
        return res.redirect('back');
        
    } catch (err) {
        console.log(err);
    }
}

Date.prototype.toShortFormat = function() {

    const monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];
    
    const day = this.getDate();
    
    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];
    
    const year = this.getFullYear();
    
    return `${day}-${monthName}-${year}`;  
}

module.exports.views_comment = async (req, res) => {

    try {

        if (req.query.status == 'deActive') {
            let Active = await comment.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await comment.findByIdAndUpdate(req.query.id, { isActive: true });
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

        let data = await comment.find({
            $or: [
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { email: { $regex: '.*' + search + '.*', $options: 'i' } },
                { date: { $regex: '.*' + search + '.*', $options: 'i' } },
                { date: { $regex: '.*' + search + '.*', $options: 'i' } },
                { comment: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]

        })
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        let countcommentdata = await comment.find({
            $or: [
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { email: { $regex: '.*' + search + '.*', $options: 'i' } },
                { date: { $regex: '.*' + search + '.*', $options: 'i' } },
                { date: { $regex: '.*' + search + '.*', $options: 'i' } },
                { comment: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let parpagrecords = Math.ceil(countcommentdata / par_page)

        let cdata = await comment.find({})
            .populate('postId')
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        if (cdata) {
            return res.render('views_comment', {
                commentrecords: cdata,
                PageData: parpagrecords,
                cpage: page,
                search: search
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}