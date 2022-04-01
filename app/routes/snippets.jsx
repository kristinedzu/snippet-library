import { useLoaderData, useSearchParams, Link, Outlet } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ request}) {
  const db = await connectDb();

  const url = new URL(request.url)
  const search = new URLSearchParams(url.search);
  const searchValue = search.get("query");
  // const snippets = await db.models.Snippet.find();
  
  console.log(searchValue);
  if(searchValue) {
    const filteredSnippets = await db.models.Snippet.find({title: searchValue});
    return filteredSnippets;
  } else {
    const snippets = await db.models.Snippet.find();
    return snippets;
  }
}

// export async function loader({ request}) {
//   const db = await connectDb();
//   const snippets = await db.models.Snippet.find();
//   const url = new URL(request.url)
//   const search = new URLSearchParams(url.search);
//   console.log(search);
//   // return snippets(search.get("query"));
//   return snippets;
// }

export default function Index() {
  const snippets = useLoaderData();
  const [params] = useSearchParams();

  return (
    <div className="pb-3 m-4 grid xl:grid-cols-[400px_1fr] gap-4 grid-cols-1">
      <div>
        <h1 className="text-2xl font-bold mb-4">All snippets</h1>

        <form>
          <input type="text" name="query" placeholder="Search.." defaultValue={params.get("query")}/>
        </form>

        <ul className="ml-5 list-disc">
          {snippets.map((snippet) => {
            return (
              <li key={snippet._id}>
                <Link
                  to={`/snippets/${snippet._id}`}
                  className="text-blue-600 hover:underline">
                  {snippet.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
