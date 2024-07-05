import Campground from "../models/campground.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const mapboxtoken = process.env.MAP_BOX;
const geoCoder = mbxGeocoding({ accessToken: mapboxtoken });

export async function index(_, res) {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
}

export function renderNewForm(req, res) {
  res.render("campgrounds/new");
}

export async function createCampground(req, res, next) {
  const geoData = await geoCoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully made a new Toilet!");
  res.redirect(`/toilink/${campground._id}`);
}

export async function showCampground(req, res) {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find that Toilet!");
    return res.redirect("/toilink");
  }
  res.render("campgrounds/show", { campground });
}

export async function renderEditForm(req, res) {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that Toilet!");
    return res.redirect("/toilink");
  }
  res.render("campgrounds/edit", { campground });
}

export async function updateCampground(req, res) {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash("success", "Successfully updated Toilet!");
  res.redirect(`/toilink/${campground._id}`);
}

export async function deleteCampground(req, res) {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Toilet");
  res.redirect("/toilink");
}
