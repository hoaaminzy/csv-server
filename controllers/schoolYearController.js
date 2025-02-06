const SchoolYear = require("../models/schoolYearModel");

// Create a new school year
exports.createSchoolYear = async (req, res) => {
  try {
    const { year, semester } = req.body;

    const normalizedSemester = semester.toLowerCase();

    // Check for duplicate year
    const existingSchoolYear = await SchoolYear.findOne({ year });

    if (existingSchoolYear) {
      // If year exists, add semester to the existing year's semester list
      if (!existingSchoolYear.semesters.includes(normalizedSemester)) {
        existingSchoolYear.semesters.push(normalizedSemester);
        await existingSchoolYear.save();
        return res
          .status(200)
          .json({ message: "Semester added successfully", existingSchoolYear });
      } else {
        return res
          .status(400)
          .json({ message: "Semester already exists for this year" });
      }
    } else {
      // If year doesn't exist, create a new school year
      const newSchoolYear = new SchoolYear({
        year,
        semesters: [normalizedSemester],
      });
      await newSchoolYear.save();
      res
        .status(201)
        .json({ message: "School year created successfully", newSchoolYear });
    }
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
    const { year, semester } = req.body;

    const updatedSchoolYear = await SchoolYear.findById(id);

    if (!updatedSchoolYear)
      return res.status(404).json({ message: "School year not found" });

    // Check if the year is changing and add semester to the new year
    if (year && updatedSchoolYear.year !== year) {
      updatedSchoolYear.year = year;
    }

    // Normalize semester and add it to the list if it's not already there
    const normalizedSemester = semester.toLowerCase();
    if (!updatedSchoolYear.semesters.includes(normalizedSemester)) {
      updatedSchoolYear.semesters.push(normalizedSemester);
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
    const { semester } = req.body; // Optional: delete a specific semester from the year

    const schoolYear = await SchoolYear.findById(id);
    if (!schoolYear)
      return res.status(404).json({ message: "School year not found" });

    if (semester) {
      const index = schoolYear.semesters.indexOf(semester.toLowerCase());
      if (index > -1) {
        schoolYear.semesters.splice(index, 1);
        await schoolYear.save();
        return res
          .status(200)
          .json({ message: "Semester deleted successfully", schoolYear });
      } else {
        return res.status(404).json({ message: "Semester not found" });
      }
    } else {
      // Delete the entire school year if no semester is specified
      await schoolYear.remove();
      return res
        .status(200)
        .json({ message: "School year deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting school year", error });
  }
};
