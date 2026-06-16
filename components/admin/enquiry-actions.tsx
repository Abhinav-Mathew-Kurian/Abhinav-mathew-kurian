"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type EnquiryDoc = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
  status: "new" | "read" | "responded";
  createdAt: string;
};

export function EnquiryActions({ enquiry }: { enquiry: EnquiryDoc }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(enquiry.status);
  const [updating, setUpdating] = useState(false);

  async function updateStatus(next: string | null) {
    if (!next) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setStatus(next as EnquiryDoc["status"]);
      toast.success("Status updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Select value={status} onValueChange={updateStatus} disabled={updating}>
        <SelectTrigger size="sm" className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="read">Read</SelectItem>
          <SelectItem value="responded">Responded</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button size="sm" variant="outline" />}>
          <Eye className="size-4" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{enquiry.name}</DialogTitle>
            <DialogDescription>
              {new Date(enquiry.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-foreground">{enquiry.email}</dd>
            </div>
            {enquiry.phone && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-foreground">{enquiry.phone}</dd>
              </div>
            )}
            {enquiry.projectType && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Project type</dt>
                <dd className="text-foreground">{enquiry.projectType}</dd>
              </div>
            )}
            {enquiry.budgetRange && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Budget</dt>
                <dd className="text-foreground">{enquiry.budgetRange}</dd>
              </div>
            )}
          </dl>

          <p className="rounded-lg bg-secondary p-3 text-sm leading-relaxed whitespace-pre-line text-foreground">
            {enquiry.message}
          </p>

          <DialogFooter>
            <Button
              nativeButton={false}
              render={<a href={`mailto:${enquiry.email}`} />}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Mail className="size-4" /> Reply by email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
