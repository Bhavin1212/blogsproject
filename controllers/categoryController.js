const category = require('../models/category');

module.exports.add_category = async (req,res)=>{
    return res.render('add_category');
}

module.exports.innsertCategoryRec = async (req,res)=>{
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        let data = await category.create(req.body);
        if(data){
            return res.redirect('back');
        }
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.isActive=true;
    }
    catch(err){
        console.log(err);
    }
}

module.exports.view_category = async (req,res)=>{
    try{
        if(req.query.isActive=='active'){
            let data = await category.findByIdAndUpdate(req.query.id,{isActive:true});
        }
        
        if(req.query.isActive=='deactive'){
            let data = await category.findByIdAndUpdate(req.query.id,{isActive:false});
        }

        var search = '';
        if(req.query.search){
            search = req.query.search;
        }

        var page=1;
        if(req.query.page){
            page=req.query.page;
        }
        var per_page=2;


        let data = await category.find({
            $or :[
                {category : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })
        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let catdata =await category.find({})
        

        let CountSliderData = await category.find({
            $or :[
                {category : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountSliderData/per_page);
        if(data){
            return res.render('view_category',{
                data,
                'pagesData':pagePerRec,
                'cpage': page,
                search:search,
                catdata
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deletcatRec = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await category.findByIdAndDelete(id);
        if(data){
            return res.redirect('/category/view_category');
        }
        else{
            console.log("error");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.multDel = async (req,res)=>{
    try{
        let data = req.body.multDel;
        data.forEach(async element => {
            await category.findByIdAndDelete(element);
        });
        return res.redirect('/category/view_category');
    }
    catch(err){
        console.log(err);
    }
}