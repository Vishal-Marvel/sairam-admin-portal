import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectVillageProps {
  villages: string[];
  onChange: (value: string) => void;
  value: string;
}

const SelectVillage = (props: SelectVillageProps) => {
  return (
    <Select onValueChange={props.onChange} value={props.value} defaultValue={props.value}>
      <SelectTrigger className="">
        <SelectValue placeholder="Village" />
      </SelectTrigger>
      <SelectContent>
        {props.villages.map((village) => (
          <SelectItem key={village} value={village}>{village}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectVillage;
