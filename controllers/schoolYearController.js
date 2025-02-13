const SchoolYear = require("../models/schoolYearModel");

// Create a new school year
exports.createSchoolYear = async (req, res) => {
  try {
    const { year } = req.body;

    // Check for duplicate year
    const existingSchoolYear = await SchoolYear.findOne({ year });
    if (existingSchoolYear) {
      res.status(400).json({ message: "Year exits" });
    }
    const newSchoolYear = new SchoolYear({
      year,
    });
    await newSchoolYear.save();
    res
      .status(201)
      .json({ message: "School year created successfully", newSchoolYear });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all school years
exports.getAllSchoolYears = async (req, res) => {
  try {
    const schoolYears = await SchoolYear.find();
    res.status(200).json(schoolYears);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving school years", error });
  }
};

// Update a school year by ID
exports.updateSchoolYear = async (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;

    const updatedSchoolYear = await SchoolYear.findById(id);

    if (!updatedSchoolYear)
      return res.status(404).json({ message: "School year not found" });

    // Check if the year is changing and add semester to the new year
    if (year && updatedSchoolYear.year !== year) {
      updatedSchoolYear.year = year;
    }

    await updatedSchoolYear.save();
    res.status(200).json(updatedSchoolYear);
  } catch (error) {
    res.status(500).json({ message: "Error updating school year", error });
  }
};

// Delete a school year by ID
exports.deleteSchoolYear = async (req, res) => {
  try {
    const { id } = req.params;
    await SchoolYear.findByIdAndDelete(id);
    res.status(200).json({ message: "Year deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting school year", error });
  }
};
