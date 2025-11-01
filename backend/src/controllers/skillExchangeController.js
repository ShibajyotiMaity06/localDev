const SkillExchange = require('../models/SkillExchange.js')
const Fuse = require('fuse.js')

// new skill hai re babba
exports.createNewSkill = async (req , res) => {
    try {
        const {skillRequired , skillOffered , location , description , category} = req.body;
        const newSkillPost = new SkillExchange({
            userId : req.user._id,
            skillRequired,
            skillOffered,
            location,
            description,
            category
        })

        const savedPost = await newSkillPost.save()
        res.status(201).json({savedPost})
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
        console.log('new skill creation me error')
    }
}


exports.getSkillExchanges = async (req, res) => {
  try {
    const { category, status, search } = req.query;

    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    let posts = await SkillExchange.find(query).populate('userId', 'name').populate('acceptedBy', 'name');


    // Only run Fuse if search is a non-empty string
    if (search && search.trim()) {
      const fuse = new Fuse(posts, {
        keys: ['skillRequired'],
        threshold: 0.4
      });
      posts = fuse.search(search).map(result => result.item);
    }

    res.json(posts);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};


exports.acceptSkillExchange = async (req, res) => {
  try {
    const post = await SkillExchange.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.status !== 'Open') return res.status(400).json({ message: 'Already accepted or completed' });
    post.status = 'In Progress';
    post.acceptedBy = req.user._id;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err)
  }
};


exports.completeSkillExchange = async (req, res) => {
  try {
    const post = await SkillExchange.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.status !== 'In Progress') return res.status(400).json({ message: 'Can only complete In Progress' });

    if (
      !post.userId.equals(req.user._id) &&
      !post.acceptedBy.equals(req.user._id)
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    post.status = 'Completed';
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





exports.deleteSkill = async (req , res) => {
  try {
    const post = await SkillExchange.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({json:'post not found'})
    res.json({message : 'post delete chill re'})
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('problem in post deletion')
  }
}


exports.updateSkill = async (req , res) => {
  try {
    const post = await SkillExchange.findById(req.params.id)
    if (!post) return res.status(404).json({json:'post not found'})
    const {skillRequired , skillOffered , location , description , category , status} = req.body;
  if (skillRequired) post.skillRequired = skillRequired;
  if (skillOffered) post.skillOffered = skillOffered;
    if (description) post.description = description;
    if (location) post.location = location;
    if (category) post.category = category;
    if (status && ['Open','In Progress' , 'Completed'].includes(status)) post.status = status;

    await post.save()
    res.json(post)
  } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('error in update')
  }
}