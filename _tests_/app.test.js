const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");
const { convertTimestampToDate } = require("../db/seeds/utils.js");


describe("GET/api/topics", () => {
    test("status:200 - responds with an array of topics, with slug and description properties", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
                const { topics } = body;
                expect(topics).toBeInstanceOf(Array);
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String),
                    });
                });
            })
        })
        it("status 404 - not a route/path ", () => {
            return request(app)
                .get("/api/badroute")
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe("Bad request");
                });
})
       
  });

  describe("GET/api/frequency", () => {
    test("status:200 - responds with an array of frequency, with name and description properties", () => {
        return request(app)
            .get("/api/frequency")
            .expect(200)
            .then(({ body }) => {
                const { frequency } = body;
                expect(frequency).toBeInstanceOf(Array);
                expect(frequency).toHaveLength(5);
                frequency.forEach((frequency) => {
                    expect(frequency).toMatchObject({
                        name: expect.any(String),
                        description: expect.any(String),
                    });
                });
            })
        })
    
  });

  describe("POST /api/:owner/habits habit test ", ()=>{
    test("201, post request, adds a habit, to a user, and returns the posted habit", ()=>{
        const inputHabit = {
            name: "books",
            body: 'read more books', 
            frequency:"Every day",
            motivational_message:"reading rocks"
            }
            return request(app)
        .post("/api/butter_bridge/habits")
        .send(inputHabit)
        .expect(201)
        .then(( { body } )=>{
          
            const { habit } = body;
            expect(habit).toBeInstanceOf(Object)
            expect(habit).toMatchObject({
                habit_id: expect.any(Number),
                name: expect.any(String),
                created_at: expect.any(String),
               owner: 'butter_bridge',
               body: "read more books",
               name:"books",
               frequency:"Every day",
               motivational_message:"reading rocks"
            })
        })
    })
    test("status 400 - missing values on post name ", () => {
        const inputHabit = {
           
            body: 'read more books', 
            frequency:"Every day",
            motivational_message:"reading rocks"
            }
        return request(app)
            .post("/api/butter_bridge/habits")
            .send(inputHabit)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Please enter a name");
            });


    });
    test("status 404 - not existing owner ", () => {
        const inputHabit = {
            name: "books",
            body: 'read more books', 
            frequency:"Every day",
            motivational_message:"reading rocks"
            }
        return request(app)
            .post("/api/nicola/habits")
            .send(inputHabit)
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe("not found");
            });
});
test("status 201 - extra keys on the post object ", () => {
    const inputHabit = {
        name: "books",
        body: 'read more books', 
        frequency:"Every day",
        motivational_message:"reading rocks",
        amount_days:5
        }
    return request(app)
        .post("/api/butter_bridge/habits")
        .send(inputHabit)
        .expect(201)
        .then(({ body }) => {
                const { habit } = body;
                expect(habit).toBeInstanceOf(Object)
                expect(habit).toMatchObject({
                    habit_id: expect.any(Number),
                    name: expect.any(String),
                    created_at: expect.any(String),
                   owner: 'butter_bridge',
                   body: "read more books",
                   name:"books",
                   frequency:"Every day",
                   motivational_message:"reading rocks"
                })
            })
        });
        
});
describe("PATCH /api/habits/:habitid  request", () => {
    test("status 200 - increments days correctly and returns the updated habit ", () => {
        const update = { amount_days: 2 };
        return request(app)
            .patch("/api/habits/3")
            .send(update)
            .expect(201)
            .then(({ body }) => {
               
               const { habit } = body;
                
                expect(habit).toMatchObject({
                    name: 'eat more fruit',
        owner: 'lurker',
        body: 'More info on your new habit ',
        created_at: "2020-11-07T06:03:00.000Z",
        frequency: 'Once per Week',
        amount_days: 7,
        motivational_message:"yeah you can do it"
                });
            })
        })
        test("status 200 - decrements days correctly and returns the updated habit ", () => {
            const update = { amount_days: -2 };
            return request(app)
                .patch("/api/habits/3")
                .send(update)
                .expect(201)
                .then(({ body }) => {
                   
                   const { habit } = body;
                    
                    expect(habit).toMatchObject({
                        name: 'eat more fruit',
            owner: 'lurker',
            body: 'More info on your new habit ',
            created_at: "2020-11-07T06:03:00.000Z",
            frequency: 'Once per Week',
            amount_days: 3,
            motivational_message:"yeah you can do it"
                    });
                })
            })
            test("status 404 - responds with an error message when habit id doesn't exist", () => {
    
                const update = { amount_days: 2 };
                    return request(app)
                    .patch("/api/habits/7")
                    .send(update)
                    .expect(404)
                .then(({ body }) => {
                 expect(body.msg).toBe("Not found");
                  })
            });
    })

    