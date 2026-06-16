import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/lib/models/Project";
import { EnquiryModel } from "@/lib/models/Enquiry";

export default async function AdminDashboardPage() {
  await connectToDatabase();
  const [projectCount, enquiryCount, newEnquiryCount] = await Promise.all([
    ProjectModel.countDocuments(),
    EnquiryModel.countDocuments(),
    EnquiryModel.countDocuments({ status: "new" }),
  ]);

  const stats = [
    { label: "Projects", value: projectCount },
    { label: "Total enquiries", value: enquiryCount },
    { label: "New enquiries", value: newEnquiryCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Quick overview of your portfolio content.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass glow-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
