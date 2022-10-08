const { StatusCodes } = require('http-status-codes');
const Category = require('../model/category');

const categoryCtrl = {
    getAll: async (req,res) => { 
        try{
            let category = Category.find(req.body) 
            res.statues(StatusCodes.OK).json({ categories, count: categories.length })
                // res.json({ msg: " get all works"})
        } catch(err){
            return res.status(500).json({ msg: err.message})
        }
    },
    getSingle: async (req,res) => { 
        try{
            let category = await Category.findOne({ _id: req.params.id})
            if (!category)
            return res.status(StatusCodes.NOT_FOUND).json({msg: "No category found"}) 
            res.status(StatusCodes.OK).json({ category })
            // res.json({ msg: " get single works"})

        } catch(err){
            return res.status(500).json({ msg: err.message})
        }
    },
    create: async (req,res) => { 
        try{
            let category = Category.create(req.body) 
            res.statues(StatusCodes.CREATED).json({ category })
            // await Category.create()

            // res.json({ msg: " create works"})

        } catch(err){
            return res.status(500).json({ msg: err.message})
        }
    },
    update: async (req,res) => { 
        try{
            let category = await Category.findOneAndUpdate({_id: req.params.id }, req.body, {
                new: true,
                runvalidators: true
            })
            if(!category)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No Category Found to do update."})

            res.status(StatusCodes.OK).json({ category })
            // res.json({ msg: " update works"})

        } catch(err){
            return res.status(500).json({ msg: err.message})
        }
    },
    delete: async (req,res) => {
        try{
            let id = req.params.id 
            await Category.findOneAndDelete({ _id: id })
            res.status(StatusCodes.OK).json({ msg: "category deleted successfully"})

            // res.json({ msg: " delete works"})

        } catch(err){
            return res.status(500).json({ msg: err.message})
        }
     },
}

module.export = categoryCtrl