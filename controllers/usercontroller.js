const slider = require('../models/slidermodel');
const offer = require('../models/offermodel');
const photo = require('../models/photosmodel');
const review = require('../models/reviewmodel');
const blog = require('../models/blogmodel');
const comment = require('../models/commentmodel')

module.exports.index = async (req, res) => {
    let data = await slider.find({ isActive: true })
    let ofdata = await offer.find({ isActive: true })
    let podata = await photo.find({ isActive: true })
    let revidata = await review.find({ isActive: true });
    let blogre = await blog.find({ isActive: true });


    if (data) {
        return res.render('userview/index', {
            slider: data,
            offer: ofdata,
            photo: podata,
            reviewdata: revidata,
            blog: blogre,
        })
    }
}

module.exports.blog_single = async (req,res)=>{
    let id = req.query.id;
    try {

      let data = await blog.findById(id);
      let blogdata = await blog.find({});
  
      let cdata = await comment.find({oldid:id,isActive:true});

      let datacount = await comment.find({isActive:true}).countDocuments();
      var pagedata = [];
      blogdata.map((v,i)=>{
        pagedata.push(v.id);
      })
      var next = pagedata.indexOf(id);
  
      let reversdata = await blog.find({isActive:true}).sort({_id:-1}).limit(3);
  
      return res.render('userview/blog_single',{
        data,
        cdata,
        datacount,
        next ,
        pre:next,
        pagedata,
        reversdata
      });
    } catch (err) {
      console.log(err);
    }
  }
