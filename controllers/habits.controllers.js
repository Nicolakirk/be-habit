const { insertHabits, addDaysbyHabit, selectHabitById, selectHabitByOwner } = require("../models/habits.model");

exports.postHabits = (req, res, next)=>{
    const  owner = req.params;
    const habitBody =  req.body;
    

const habitsPromises = [insertHabits(  owner, habitBody)];
Promise.all(habitsPromises)
.then (([habit])=>{
   
    res.status(201).send({ habit })
})
.catch((err)=>{
    next( err);
  });


}

exports.patchDaysforHabits = (req, res, next) =>{
          
    const  habit_id= req.params;
    const amount_days = req.body
  addDaysbyHabit(habit_id, amount_days)
.then((habit)=>{

res.status(201).send({ habit })
})
.catch((err)=>{
next( err);
});
  }



  