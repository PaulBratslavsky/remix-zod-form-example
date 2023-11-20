import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function FormInput({
  name,
  label,
  placeholder,
  defaultValue = "",
  data,
}: Readonly<{
  name: string;
  label?: string;
  placeholder?: string;
  data: any;
  defaultValue?: string;
}>) {
  return (
    <div className="w-full">
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="relative">
          <Input
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </div>
      </div>
      {data
        ? data.errors[name].map((error: string) => (
            <p key={error} className="mt-2 p-2 bg-red-500 text-white">
              {error}
            </p>
          ))
        : null}
    </div>
  );
}

export function TranscriptForm({ data }: Readonly<{ data: any }>) {
  console.log(data);

  return (
    <div>
      <h1>Form</h1>
      <Form className="space-y-3" method="POST">
        <FormInput 
          name="url"
          label="URL"
          placeholder="https://example.com"
          data={data}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
