import Opportunity from "../models/Opportunity.js";

export const start = async (req, res) => {
  try {
    const { userId, employerId, opportunityId } = req.body;
    const opportunity = await Opportunity.findOne({
      employer: employerId,
      _id: opportunityId,
    });
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    opportunity.contracts.push({
      employeeId: userId,
      status: "pending",
    });

    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const refuse = async (req, res) => {
  try {
    const { userId, employerId, opportunityId } = req.body;
    const opportunity = await Opportunity.findOne({
      employer: employerId,
      _id: opportunityId,
    });
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    opportunity.refusedApplicants.push(userId);

    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const confirm = async (req, res) => {
  try {
    const { opportunityId, contractId } = req.body;
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    const contract = opportunity.contracts.id(contractId);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    contract.status = "confirmed";
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
