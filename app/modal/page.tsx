"use client";

import { assertAssurance } from "@/clerk/expect-assured";
import { createRandomApiKey } from "../actions/createApiKey";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ClientPage() {
  const [open, setOpen] = useState(false);
  const createKey = async () => {
    await assertAssurance(() => createRandomApiKey("one"));
    setOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={createKey}>Create a key (2)</button>
      <DialogDemo open={open} setOpen={setOpen} />
    </main>
  );
}

export function DialogDemo(props: {
  open: boolean;
  setOpen: (a: boolean) => void;
}) {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">lol</div>
        <DialogFooter>
          <DialogClose asChild>
            <button type="submit">Save changes</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
