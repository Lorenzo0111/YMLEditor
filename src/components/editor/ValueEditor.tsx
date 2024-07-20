import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

export type ValueEditorProps = {
  value: any;
  setValue: (value: any) => void;
};

export function ValueEditor(props: ValueEditorProps) {
  switch (typeof props.value) {
    case "string":
      return <StringEditor {...props} />;
    case "boolean":
      return <BooleanEditor {...props} />;
  }

  return null;
}

export function StringEditor(props: ValueEditorProps) {
  return (
    <Input
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}

export function BooleanEditor(props: ValueEditorProps) {
  return (
    <Switch
      checked={props.value}
      onCheckedChange={(e: boolean) => props.setValue(e)}
    />
  );
}
