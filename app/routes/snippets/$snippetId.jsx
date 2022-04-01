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
    case "update":
      await db.models.Snippet.findByIdAndUpdate(params.snippetId, { title: formData.get("title"), lang: formData.get("lang"), code: formData.get("code"), description: formData.get("description") });
      return null;
  }
}


export default function SnippetPage() {
  const snippet = useLoaderData();
    
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center content-center">
        <h2 className="text-2xl font-bold pr-4">{snippet.title}</h2>
        <Form method="post" className="">
          <input type="hidden" name="_method" value="favorite" />
          <button type="submit" className="text-2xl btn-secondary">
            <i className={snippet.favorite === true ? "ri-heart-fill" : "ri-heart-line"}></i>
          </button>
        </Form>
      </div>
      <div className="py-8">
        <label className="font-bold">Coding language:</label>
        <p className="pb-4">{snippet.lang}</p>
        <label className="font-bold">Description:</label>
        <p>{snippet.description}</p>
      </div>
      <code>
        <pre><textarea className="p-4 w-5/6 height whitespace-pre-wrap outline-none bg-white" name="" id="" cols="30" rows="10" readOnly value={snippet.code}></textarea></pre>
      </code>
      <div className="flex flex-wrap py-4">
        
        <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"/>
        <label for="openSidebarMenu" class="sidebarIconToggle"></label>
        <div id="sidebarMenu" className="p-6 bg-slate-300 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Add new snippet</h1>
            <Form method="post">
              <input type="hidden" name="_method" value="update" />
              <label htmlFor="title" className="block">
                Snippet title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={snippet.title}
                id="title"
              />
              <label htmlFor="lang" className="block">
                Coding language
              </label>
              <input
                type="text"
                name="lang"
                defaultValue={snippet.lang}
                id="lang"
              />
              <label htmlFor="code" className="block">
                Code snippet
              </label>
              <textarea
                type="text"
                name="code"
                defaultValue={snippet.code}
                id="code"
              />
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                defaultValue={snippet.description}
                id="description"
              />
              <br />
              
              <button  type="submit" className="my-4 btn-primary hover:bg-teal-800 text-white py-2 px-4 rounded">Save</button>
            </Form>
        </div>
        <button type="submit" className="btn-primary hover:bg-teal-800 text-white py-2 px-4 rounded">
          Edit
        </button>
        <Form method="post">
            <input type="hidden" name="_method" value="delete" />
            <button type="submit" className="mx-4 btn-delete hover:bg-red-900 text-white py-2 px-4 rounded flex flex-wrap">
            <i className="ri-delete-bin-line px-1"></i> Delete
            </button>
        </Form>
      </div>
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
