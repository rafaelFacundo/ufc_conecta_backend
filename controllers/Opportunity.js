import Opportunity from "../models/Opportunity.js";
import Student from "../models/Student.js";

export const getAll = async (req, res) => {
  try {
    const { text, workLocation, weeklyHours, salary } = req.query;
    let filter = {};

    if (text) {
      filter.$or = [
        { title: { $regex: text, $options: "i" } },
        { description: { $regex: text, $options: "i" } },
      ];
    }

    if (workLocation) {
      filter.workLocation = workLocation;
    }

    if (weeklyHours) {
      filter.weeklyHours = { $lte: weeklyHours };
    }

    if (salary) {
      filter.salary = { $gte: salary };
    }

    const opportunities = await Opportunity.find(filter).populate(
      "employer",
      "-password"
    );
    res.status(200).json(opportunities);
  } catch (error) {
    console.log("Something went wrong when trying to get all opportunities");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to get all opportunities",
    });
  }
};

export const create = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      weeklyHours,
      workLocation,
      employer,
      endDate,
    } = req.body;
    const newOpportunity = new Opportunity({
      title,
      description,
      salary,
      weeklyHours,
      workLocation,
      employer,
      endDate,
    });
    await newOpportunity.save();
    res.status(201).json(newOpportunity);
  } catch (error) {
    console.log("Something went wrong when trying to create the opportunity");
    console.log(error);
    res.status(400).json({
      message: "Something went wrong when trying to create the opportunity.",
    });
  }
};

export const getById = async (req, res) => {
  try {
    const opportunityId = req.params.id;
    const opportunity = await Opportunity.findById(opportunityId).populate(
      "employer",
      "-password"
    );
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    console.log("Something went wrong when trying to retrieve the opportunity");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to retrieve the opportunity.",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const opportunityId = req.params.id;
    const result = await Opportunity.findByIdAndDelete(opportunityId);
    if (!result) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    console.log("Something went wrong when trying to delete the opportunity");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to delete the opportunity.",
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const opportunityId = req.params.id;
    const opportunity = await Opportunity.findById(opportunityId).populate(
      "applicants",
      "-password"
    );
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(opportunity.applicants);
  } catch (error) {
    console.log("Something went wrong when trying to retrieve the applicants");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to retrieve the applicants.",
    });
  }
};

export const applyToOpportunity = async (req, res) => {
  try {
    const opportunityId = req.params.id;
    const { studentId } = req.body;

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (opportunity.applicants.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student has already applied to this opportunity" });
    }

    opportunity.applicants.push(studentId);
    await opportunity.save();

    res.status(200).json({ message: "Applied to opportunity successfully" });
  } catch (error) {
    console.log("Something went wrong when trying to apply to the opportunity");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to apply to the opportunity.",
    });
  }
};

export const getByEmployerId = async (req, res) => {
  try {
    const employerId = req.params.id;
    const opportunities = await Opportunity.find({
      employer: employerId,
    });
    res.status(200).json(opportunities);
  } catch (error) {
    console.log("Something went wrong when trying to retrieve the opportunity");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to retrieve the opportunity.",
    });
  }
};
