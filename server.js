const express = require("express")
const app = express()
const PORT = 3000
const viewEngine = require("express-react-views").createEngine

// =====================================
//              MIDDLEWARE 
// =====================================
// View Engine
app.set("view engine", "jsx")
app.engine("jsx", viewEngine())

// uses bodyParser to get req.body
app.use(express.urlencoded({extended: false}))
// static-assets folder 
app.use(express.static('public'))

// =======================================
//              DATABASE
// =======================================
const budgetData = require('./models/budget.js')

// =======================================
//              ROUTES
// =======================================
// order of INDUCES important 

// INDEX-route
app.get('/budgets', (req, res) => {
    // renders Index-JSX template
        // send this.props
    res.render('Index', {
        budgetsArr: budgetData
    })
})

// NEW route 
app.get('/budgets/new', (req, res) => {
    // displays HTML form to user
    res.render('New')
})

// CREATE/POST-route
app.post("/budgets", (req, res) => {
    // push the data
    budgetData.push(req.body)
    // redirect to Index.jsx
    res.redirect("/budgets")
})

// SHOW-route single resource
app.get("/budgets/:indexOfBudgetsArray", (req, res) => {
    // pass this.props 
    res.render("Show", {
        // show single budget
        budget: budgetData[req.params.indexOfBudgetsArray]
    })
})

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
    console.log("listening...")
})