const express = require('express');
const Joi = require('joi');
const db = require('../config/db')
const router = express.Router();

router.get('/',(req,res)=>{
    db.query('select Id,Name from courses',(err,rows) => {
        if (err) res.status(500).send('Unable to Query DB');
        res.send(rows);
    })
})

router.get('/:id',(req,res)=>{
    db.query(`select Id,Name from courses where Id = ${req.params.id}`,(err,rows) => {
        if (err) res.status(500).send('Unable to Query DB');
        let course = rows.find( c => (c.Id === parseInt(req.params.id)));
        if (!course) res.status(404).send(`The Course with ID ${req.params.id} not Found !`);
        res.send(course)
    })
})

router.post('/',(req,res)=>{
    const result = validateCourse(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    db.query('select count(*) from courses as count',(err,rows)=> {
        let courseCount = rows[0]['count(*)'];
        if (courseCount === undefined) return res.status(500).send('Unable to get courseCount');
        const course = {
            id : courseCount + 1,
            name : req.body.name 
        };
        db.query(`INSERT INTO courses VALUES (${course.id},'${course.name}' )`,(err,rows) => {
            if (err) res.status(500).send('Unable to insert into DB');
            res.send(course)
        })
    })
    
})


router.put('/:id',(req,res) => {
    db.query('select Id,Name from courses',(err,rows) => {
        if (err) res.status(500).send('Unable to Query DB');
        let course = rows.find( c => (c.Id === parseInt(req.params.id)));
        if (!course) res.status(404).send(`The Course with ID ${req.params.id} not Found !`);
        const result = validateCourse(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);
        course.Name=req.body.name;
        db.query(`UPDATE courses SET Name = '${req.body.name}' WHERE Id = ${course.Id}`,(err,rows) => {
            console.log(err);
            if (err) return res.status(500).send('Unable to Update DB !');
            res.send(course)
        })
    })
})

router.delete('/:id',(req,res) => {
    db.query('select Id,Name from courses',(err,rows) => {
        if (err) res.status(500).send('Unable to Query DB');
        let course = rows.find( c => (c.Id === parseInt(req.params.id)));
        if (!course) res.status(404).send(`The Course with ID ${req.params.id} not Found !`);
        const result = validateCourse(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);
        db.query(`DELETE FROM courses WHERE Id = ${req.params.id}`,(err,rows) => {
            console.log(err);
            if (err) return res.status(500).send('Unable to Update DB !');
            res.send(course)
        })
    })
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course);

}

module.exports = router;