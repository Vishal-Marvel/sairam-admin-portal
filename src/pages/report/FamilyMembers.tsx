import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FamilyMember } from "@/schema";

interface FamilyMembersProps {
  value: number;
  members: FamilyMember[];
}

const FamilyMembers: FC<FamilyMembersProps> = ({ value, members }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="w-fit">
        {value}
      </Button>
    </DialogTrigger>
    <DialogContent className="min-w-[50rem]">
      <DialogHeader>
        <DialogTitle>Family Members Details</DialogTitle>
      </DialogHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Aadhaar Status</TableHead>
            <TableHead>Marital Status</TableHead>
            <TableHead>Level of Education</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={ index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.age}</TableCell>
              <TableCell>{member.gender}</TableCell>
              <TableCell>{member.aadhaar_status}</TableCell>
              <TableCell>{member.marital_status}</TableCell>
              <TableCell>{member.level_of_education}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  </Dialog>
);

export default FamilyMembers;
