const blog = require('../models/blogmodel')

const fs = require('fs');

const path = require('path');

module.exports.add_blog = async (req, res) => {
    return res.render('add_blog')
}

module.exports.deactive = async (req, res) => {
    let data = await blog.findByIdAndUpdate(req.params.id, { isActive: false })
    // console.log(req.params.id)
    return res.redirect('/blog/views_blog')
}

module.exports.active = async (req, res) => {
    let data = await blog.findByIdAndUpdate(req.params.id, { isActive: true })

    return res.redirect('/blog/views_blog')
    // console.log(req.params.id)
}

module.exports.insertblog = async (req, res) => {
    try {
        var blogimg = ''
        if (req.file) {
            blogimg = blog.blogpath + "/" + req.file.filename;
        }
        req.body.image = blogimg

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await blog.create(req.body)
        if (data) {
            return res.redirect('/blog/views_blog')
        } else {
            console.log("blog Photo Err");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.views_blog = async (req, res) => {
    if (req.query.status == 'deActive') {
        let Active = await blog.findByIdAndUpdate(req.query.id, { isActive: false });
    }
    if (req.query.status == 'Active') {
        let Active = await blog.findByIdAndUpdate(req.query.id, { isActive: true });
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
        let data = await blog.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { date: { $regex: '.*' + search + '.*', $options: 'i' } },
                { category: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]

        })
            .limit(par_page * 1)
            .skip((page - 1) * par_page)
            .exec();

        let countblogdata = await blog.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { date: { $regex: '.*' + search + '.*', $options: 'i' } },
                { category: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let parpagrecords = Math.ceil(countblogdata / par_page)

        if (data) {
            return res.render('views_blog', {
                blogrecord: data,
                PageData: parpagrecords,
                cpage: page,
                search: search
            })
        } else {
            console.log("blog view error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.mulDel = async (req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async element => {
            let id_data = await blog.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await blog.findByIdAndDelete(element);
        });
        return res.redirect('/blog/views_blog');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}

module.exports.deleterecord = async (req, res) => {
    try {
        let data = await blog.findById(req.params.id)
        if (data) {
            let img = path.join(__dirname, '..', data.image);
            if (img) {
                fs.unlinkSync(img);
            }
            let delet = await blog.findByIdAndDelete(req.params.id);
            if (delet) {
                res.redirect('/blog/views_blog')
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.updaterecord = async (req, res) => {
    try {
        let data = await blog.findById(req.query.id)
        if (data) {
            return res.render('blogupdate', {
                blogdata: data
            })
        } else {
            console.log("update err");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.editblog = async (req, res) => {
    let blogi = req.body.blogid;
    try {
        if (req.file) {
            let data = await blog.findById(blogi)
            if (data) {
                var blogimg = path.join(__dirname, '..', data.image)
                if (blogimg) {
                    fs.unlinkSync(blogimg)
                }

                var newimg = blog.blogpath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await blog.findByIdAndUpdate(blogi, req.body)
                if (record) {
                    return res.redirect('/blog/views_blog')
                } else {
                    console.log("data is not update");
                }
            }
        } else {
            let data = await blog.findById(blogi)
            if (data) {
                req.body.image = data.image

                let record = await blog.findByIdAndUpdate(blogi, req.body)
                if (record) {
                    return res.redirect('/blog/views_blog')
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

