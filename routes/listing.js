const {listingSchema} = require("../schema.js");
const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const{storage}=require("../cloudconfig.js");
const upload = multer({ storage });



router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing, 
  wrapAsync(listingController.createListing)
);



//New Route
router.get("/new",
  isLoggedIn,
  wrapAsync(listingController.renderNewForm));


router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);



//Index Route
// router.get("/",wrapAsync(listingController.index));
  
  
  //Show Route
  // router.get("/:id",wrapAsync(listingController.showListing));
  
  
  //Create route
  // router.post("/",
  //   isLoggedIn,
  //   validateListing, 
  //   wrapAsync(listingController.createListing));
  
  
  
  //Edit route
  router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));
  
  
  
  //update route
  // router.put("/:id",isLoggedIn,
  //   isOwner,
  //   validateListing,
  //   wrapAsync(listingController.updateListing));
  
  
  //DELETE ROUTE
  // router.delete("/:id",
  //   isLoggedIn,
  //   isOwner,
  //   wrapAsync(listingController.destroyListing));

module.exports=router;