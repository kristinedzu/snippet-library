import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css",
  }
];

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 text-slate-800 font-sans p-4">
        <header className="pb-3 mb-4 border-b-2">
          <p>Snippet library</p>
          <ul>
            <li>
              <div className="ml-3 flex">
                <i class="ri-book-open-line"></i>
                <Link to="/" className="ml-2 hover:underline text-blue-600">
                  All snippets
                </Link>
              </div>
            </li>
            <li>
              <div className="ml-3 flex">
                <i class="ri-heart-line"></i>
                <Link to="/" className="ml-2 hover:underline text-blue-600">
                Favorite snippets
                </Link>
              </div>
            </li>
          </ul>

          <br />
          
          <ul>
            <p>Coding languages</p>
            <li>
              <div className="ml-3 flex">
                <i class="ri-code-line"></i>
                <Link to="/" className="ml-2 hover:underline text-blue-600">
                  JavaScript
                </Link>
              </div>
            </li>
            <li>
              <div className="ml-3 flex">
                <i class="ri-code-line"></i>
                <Link to="/" className="ml-2 hover:underline text-blue-600">
                  React
                </Link>
              </div>
            </li>
          </ul>

          <br />

          <ul>
            <p>Add new snippet</p>
            <li>
              <div className="ml-3 flex">
              <i class="ri-add-line"></i>
                <Link to="/books/new" className="ml-2 hover:underline text-blue-600">
                  New book
                </Link>
              </div>
            </li>
          </ul>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
