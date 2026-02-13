const { check, validationResult } = require("express-validator");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  // req.isLoggedIn = true;
  res.redirect("/");
}
exports.postLogout= (req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect("/login");  
  })
}

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {firstName: "", lastName: "", email: "", userType: ""}
  });
};

exports.postSignup = [
  //first name validation
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only letters"),
  //last name validation 
  check("lastName")
    .matches(/^[A-Za-z]*$/)
    .withMessage("Last name must contain only letters"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number")
    .matches(/^[A-Za-z0-9!@#$%^&*()_+]+$/)
    .withMessage("Password can only contain letters, numbers, and special characters !@#$%^&*()_+")
    .trim(),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["host", "guest"])
    .withMessage("User type must be either 'host' or 'guest'"),
  check("terms")
    .notEmpty()
    .equals("on")
    .withMessage("You must accept the terms and conditions"),
    (req, res, next) => {
      const {firstName, lastName, email, password, userType} = req.body;
      const errors =validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: errors.array().map(err => err.msg),
          oldInput: {firstName, lastName, email, userType}
        });
      }
      res.redirect("/login");
    }
];
