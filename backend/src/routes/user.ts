import express from "express";
import { UserModel } from "../models/User";
import { CommunityModel } from "../models/Community";

const userRouter = express.Router();

/**
 * @route GET /user/:id
 * @param {string} id - User ID
 * @returns {User} - User object with experiencePoints field
 */
userRouter.get("/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id).select(
    "+experiencePoints"
  );
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

/**
 * @route GET /user
 * @returns {Array} - Array of User objects
 * @note Adds the virtual field of totalExperience to the user.
 * @hint You might want to use a similar aggregate in your leaderboard code.
 */
userRouter.get("/", async (_, res) => {
  const users = await UserModel.aggregate([
    {
      $unwind: "$experiencePoints",
    },
    {
      $group: {
        _id: "$_id",
        email: { $first: "$email" },
        profilePicture: { $first: "$profilePicture" },
        totalExperience: { $sum: "$experiencePoints.points" },
      },
    },
  ]);
  res.send(users);
});

/**
 * @route POST /user/:userId/join/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description Joins a community
 */
userRouter.post("/:userId/join/:communityId", async (req, res) => {
  const { userId, communityId } = req.params;
  // TODO: Implement the functionality to join a community

  try {
    const user = await UserModel.findById(userId);
    const community = await CommunityModel.findById(communityId);

    // Check if user exists
    if (!user) {
      return res.status(404).send("This user does not exist.");
    } else {
      // Update currentCommunity
      user.currentCommunity = communityId;
      await user.save();
    }

    // Update CommunityModel

    if (community) {
      // update members
      community.members?.push(userId);
      await community.save();

      // update total points
      if (
        user.experiencePoints?.length &&
        community.totalPoints !== undefined
      ) {
        let thisUserAllPoints = 0;
        for (const pointsObj of user.experiencePoints) {
          thisUserAllPoints += pointsObj.points;
        }
        community.totalPoints = community.totalPoints + thisUserAllPoints;
        await community.save();
      }
    } else {
      return res.status(404).send("Community not found.");
    }

    res.status(200).send("User successfully joined the community.");
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).send("Internal Server Error.");
  }
});

/**
 * @route DELETE /user/:userId/leave/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description leaves a community
 */
userRouter.delete("/:userId/leave/:communityId", async (req, res) => {
  const { userId, communityId } = req.params;
  // TODO: Implement the functionality to leave a community

  try {
    const user = await UserModel.findById(userId);
    const community = await CommunityModel.findById(communityId);

    // Check if user exists
    if (!user) {
      return res.status(404).send("This user does not exist.");
    } else if (user.currentCommunity !== communityId) {
      return res.status(403).send("This user is not in this community.");
    } else {
      // Leave currentCommunity
      user.currentCommunity = "";
      await user.save();
    }

    if (community) {
      // Update members
      community.members = community.members?.filter((el) => el !== userId);
      // update total points
      if (user.experiencePoints?.length && community.totalPoints) {
        let thisUserAllPoints = 0;
        for (const pointsObj of user.experiencePoints) {
          thisUserAllPoints += pointsObj.points;
        }
        community.totalPoints = community.totalPoints - thisUserAllPoints;
        await community.save();
      }
    } else {
      return res.status(404).send("Community not found.");
    }

    res.status(200).send("User successfully left the community.");
  } catch (error) {
    console.error("Error leaving community:", error);
    res.status(500).send("Internal Server Error.");
  }
});

export { userRouter };
