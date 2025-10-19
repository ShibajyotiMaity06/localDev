const ServiceProvider = require('../models/ServiceProvider.js')

// provider profile 
exports.ProviderProfile = async (req , res) => {
    try {
        const provider = new ServiceProvider({...req.body , userId : req.user._id})
        const saved = await provider.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// providers with filters
exports.getProviders = async (req , res) => {
    try{
        const {profession , status} = req.query;
        const query = {}
        if (profession) query.profession = profession;
        if (status) query.status = status;
        const providers = await ServiceProvider.find(query)
        res.json(providers)

    }
    catch (err) {
        res.status(500).json({message : err.message})
        console.log('error in get providers ')
    }
}


exports.updateProvider = async (req , res) => {
    try {
        const provider = await ServiceProvider.findByIdAndUpdate(req.params.id , req.body)
        if (!provider) return res.status(404).json({message : 'provider ae ledu'})

        res.json(provider)
    } catch (error) {
        res.status(500).json({message : error.message})
        console.log('error in get update ')
    }
}


// delete provider
exports.deleteProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};