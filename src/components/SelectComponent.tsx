import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectComponentProps {
  values: {label:string, value:string}[];
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
}

const SelectComponent = (props: SelectComponentProps) => {
  return (
    <Select 
      onValueChange={props.onChange}
      value={props.value}
      defaultValue={props.value}
    >
      <SelectTrigger className="capitalize">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.values.map((item) => (
          <SelectItem key={item.value} value={item.value} className="capitalize">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
