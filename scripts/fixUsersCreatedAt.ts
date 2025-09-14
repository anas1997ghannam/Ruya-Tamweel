// scripts/fixUsersCreatedAt.ts
import { connectToDataBase } from "@/lib/mongoose";
import { User } from "@/models/User";

async function fixUsersCreatedAt() {
  try {
    await connectToDataBase();
    const users = await User.find({ createdAt: { $exists: false } });

    console.log(`وجدنا ${users.length} مستخدم بدون createdAt`);

    for (const user of users) {
      user.set("createdAt", new Date());
      user.markModified("createdAt"); // ضروري لإجبار Mongoose على حفظ الحقل
      await user.save();
      console.log(`م تحديث: ${user.fullName}`);
    }

    console.log("تمت العملية بنجاح");
    process.exit(0);
  } catch (err) {
    console.error("فشل التحديث:", err);
    process.exit(1);
  }
}

fixUsersCreatedAt();