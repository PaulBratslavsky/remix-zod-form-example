import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node"; // or cloudflare/deno
import z from "zod";

import { TranscriptForm } from "~/components/TranscriptForm";
import { Container } from "~/components/Container";
import { Box } from "~/components/Box";

export const loader = async () => {
  return json({ name: "Loader Data" });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const formSchema = z.object({
    url: z.string().url().min(2),
  });

  const validatedFields = formSchema.safeParse({
    url: String(formData.get("url")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
      data: null,
    };
  }

  return json({
    errors: null,
    message: "Success",
    data: null,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function IndexRoute() {
  const loaderData = useLoaderData();
  const actionData = useActionData<typeof action>();
  console.log(loaderData, actionData);

  return (
    <Box>
      <Container>
        <TranscriptForm data={actionData} />
      </Container>
    </Box>
  );
}
