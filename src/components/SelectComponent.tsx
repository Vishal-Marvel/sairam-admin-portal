import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectComponentProps {
  values: Option[];
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  text?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  values,
  onChange,
  value,
  placeholder,
  text,
}) => (
  <div className="flex gap-2 items-center">
    <span className="hidden md:block">
      {text || placeholder}:
    </span>
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="capitalize">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map(({ label, value }) => (
          <SelectItem key={value} value={value} className="capitalize">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SelectComponent;
