import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { KeyEditor } from "./KeyEditor";

export type ValueEditorProps = {
  value: any;
  setValue: (value: any) => void;
  index?: number;
};

export function ValueEditor(props: ValueEditorProps) {
  switch (typeof props.value) {
    case "string":
      return <StringEditor {...props} index={(props.index || 0) + 1} />;
    case "bigint":
    case "number":
      return <NumberEditor {...props} index={(props.index || 0) + 1} />;
    case "boolean":
      return <BooleanEditor {...props} index={(props.index || 0) + 1} />;
    case "object":
      return <ObjectEditor {...props} index={(props.index || 0) + 1} />;
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

export function NumberEditor(props: ValueEditorProps) {
  return (
    <Input
      value={props.value}
      type="number"
      onChange={(e) => props.setValue(parseInt(e.target.value))}
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

export function ObjectEditor(props: ValueEditorProps) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{
        marginLeft: 20 * (props.index || 0),
      }}
    >
      {Object.entries(props.value ?? {}).map(([key, value]) => (
        <div
          key={key}
          className="flex gap-2"
          style={{
            flexDirection: typeof value !== "object" ? "row" : "column",
            alignItems: typeof value !== "object" ? "items-center" : undefined,
          }}
        >
          <KeyEditor
            value={key}
            setValue={(newKey) => {
              const newData = { ...props.value };
              delete newData[key];
              newData[newKey] = value;
              props.setValue(newData);
            }}
          />

          <ValueEditor
            value={value}
            setValue={(newData) => {
              props.setValue({
                ...props.value,
                [key]: newData,
              });
            }}
          />
        </div>
      ))}

      <Button
        variant="outline"
        onClick={() =>
          props.setValue({
            ...props.value,
            [Object.keys(props.value).length]: "",
          })
        }
      >
        Add Field
      </Button>
    </div>
  );
}
