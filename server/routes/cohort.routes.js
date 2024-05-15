const router = require("express").Router();
const Cohort = require("../models/Cohort.model");
const mongoose = require("mongoose");

// Create new Cohort

router.post("/cohorts", (req, resp, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  Cohort.create({
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  })
    .then((response) => {
      resp.json(response);
    })
    .catch((err) => {
      console.log("Error while creating the cohort", err);
      resp.status(500).json({ message: "Error while creating the cohort" });
    });
});

//get all cohorts
router.get("/cohorts", (req, res, next) => {
  Cohort.find()
    .then((allCohorts) => res.json(allCohorts))
    .catch((err) => {
      console.log("Error while getting the cohorts", err);
      res.status(500).json({ message: "Error while getting the cohorts" });
    });
});
//get cohorts by ID
router.get("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified cohort id is not valid" });
    return;
  }

  Cohort.findById(cohortId)
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) => {
      console.log("Error while retrieving the cohort", err);
      res.status(500).json({ message: "Error while retrieving the project" });
    });
});

//Update cohorts by ID

router.put("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified Cohort id is not valid" });
    return;
  }

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => res.json(updatedCohort))
    .catch((err) => {
      console.log("Error while updating the Cohort", err);
      res.status(500).json({ message: "Error while updating the Cohort" });
    });
});

//Delete cohorts by ID

router.delete("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified cohort id is not valid" });
    return;
  }

  Cohort.findByIdAndDelete(cohortId)
    .then(() =>
      res.json({
        message: `Cohort with ${cohortId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("Error while deleting the cohort", err);
      res.status(500).json({ message: "Error while deleting the cohort" });
    });
});
module.exports = router;
