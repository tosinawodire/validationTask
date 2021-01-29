const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


const det =[{
    data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        missions: 45
      }
}];

const details_msg = [
    {message : "My Rule-Validation API",

        status: "success",
    


        data:{
            name: "Awodire Oluwatosin Olamide",
                github: "@tosinawodire",
                email: "awodiretosin@gmail.com",
                mobile: "08138610778",
                twitter: "@oluwatosinawod3"
        }
    }


];

app.get('/', (req, res)=>{
    res.send(details_msg)

});



// app.get('/api/courses/:id', (req, res)=>{
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if(!course) res.status(404).send('The course with the id not found');
//     res.send(course);
// })

app.post('/validate-rule', (req,res)=>{
    const fact = {
        
        fields: req.body.fields,
        field_value: req.body.field_value,
        condition: req.body.condition,
        condition_value: req.body.condition_value
    };
   
    const schema = Joi.object({
        fields:Joi.string().required().messages({
            'string.base': 'fields should be a type text',
            '0' : "field 0 failed validation."
           
        }),
        field_value:Joi.number().min(30).required().messages({
            'string.empty': 'condition value is missing',

        }),
        condition:Joi.string().required().messages({
            'string.base': 'condition should be a type text',
        }),
        condition_value:Joi.number().min(30).required().messages({
            'string.empty': 'condition value is missing',

        })

    });

    const result = schema.validate({fields:req.body.fields, condition:req.body.condition, condition_value:req.body.condition_value,field_value:req.body.field_value });
    
    
    if(result.error){
        res.status(400).send(result.error)
    }else{

        det.push(fact);
        res.status(200, {message:"Field missions validation successful"}).send(det);

    }
   
});

// app.post('api/courses', (req,res)=>{
//     if(!req.body.name.length < 3){
//         res.status(400).send('Name too short')
//     }
// });



// app.post('api/courses', (req, res)=>{
//     const schema = {
//         name: Joi.string().min(3).required()

//     };

//     const result = schema.validate(req.body);
//     if(!result.error){
//         res.status(400).send(result.error)
//     }
// });
const port = process.env.PORT ||3000;

app.listen(port, () => console.log('Listening on port  ${port}'));