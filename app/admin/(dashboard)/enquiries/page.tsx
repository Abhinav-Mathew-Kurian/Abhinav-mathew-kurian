import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EnquiryActions, type EnquiryDoc } from "@/components/admin/enquiry-actions";
import { connectToDatabase } from "@/lib/db";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { toPlain } from "@/lib/serialize";

const STATUS_VARIANT: Record<EnquiryDoc["status"], "default" | "secondary"> = {
  new: "default",
  read: "secondary",
  responded: "secondary",
};

export default async function AdminEnquiriesPage() {
  await connectToDatabase();
  const docs = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
  const enquiries = toPlain<EnquiryDoc[]>(docs);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Enquiries</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Contact form submissions, most recent first.
      </p>

      <div className="glass glow-border mt-6 overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No enquiries yet.
                </TableCell>
              </TableRow>
            )}
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry._id}>
                <TableCell className="font-medium text-foreground">
                  {enquiry.name}
                </TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {enquiry.message}
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[enquiry.status]} className="capitalize">
                    {enquiry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <EnquiryActions enquiry={enquiry} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
