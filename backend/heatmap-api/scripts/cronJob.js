const cron = require("node-cron");
const User = require("../models/user");
const { storeLeetCodeActivity } = require("../services/leetcodeService");

cron.schedule("0 0 * * *", async () => {
    const users = await User.find();

    for (const user of users) {
        await storeLeetCodeActivity(user._id, user.leetcodeUsername);
    }
});
