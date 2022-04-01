import { useLoaderData, useCatch, useFormAction, json, redirect, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const snippet = await db.models.Snippet.findById(params.snippetId);
  if (!snippet) {
    throw new Response(`Couldn't find snippet with id ${params.snippetId}`, {
      status: 404,
    });
  }
  return json(snippet);
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const db = await connectDb();
  switch (formData.get("_method")) {
    case "delete":
      await db.models.Snippet.findByIdAndDelete(params.snippetId);
      return redirect("/snippets");
    case "favorite":
      const snippet = await db.models.Snippet.findById(params.snippetId);
      snippet.favorite = !snippet.favorite;
      await snippet.save();
      console.log(snippet.favorite);
      return null;
  }
}


export default function SnippetPage() {
  const snippet = useLoaderData();
  console.log(snippet.favorite);
    
  return (
    <div className=" mb-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold pr-4">{snippet.title}</h2>
        <Form method="post">
          <input type="hidden" name="_method" value="favorite" />
          <button type="submit" className="btn btn-delete">
            <i className={snippet.favorite === true ? "ri-heart-fill" : "ri-heart-line"}></i>
            {/* <i className="ri-heart-fill"></i> */}
          </button>
        </Form>
      </div>
      <code>
        <pre className="whitespace-pre-wrap">{JSON.stringify(snippet, null, 2)}</pre>
        {/* <div className="whitespace-pre-wrap">
          <pre >{snippet.code}</pre>
        </div> */}
      </code>
      <Form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="btn btn-delete">
            Delete
          </button>
        </Form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
