const SkillExchange = require('../models/SkillExchange.js')
const Fuse = require('fuse.js')

// new skill hai re babba
exports.CreateNewSkill = async (req , res) => {
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
        console.log('new skill creation me error')
    }
}


// Get skillxchanges with fuzzy search , filters aisa kuch
exports.getSkillExchanges = async (req, res) => {
  try {
    const { category, status, search } = req.query;

    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    let posts = await SkillExchange.find(query).populate('userId', 'name');

    if (search) {
      // Fuse.js fuzzy search on skillRequired
      const fuse = new Fuse(posts, {
        keys: ['skillRequired'],
        threshold: 0.4
      });
      posts = fuse.search(search).map(result => result.item);
    }

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};