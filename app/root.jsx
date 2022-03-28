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
      <body className="bg-slate-100 text-slate-800 font-sans grid grid-cols-[300px_1fr_1fr] gap-4">
        <header className="p-4 bg-slate-800 min-h-screen">
          <p className="text-slate-400 text-sm">Snippet library</p>
          <ul>
            <li>
              <div className="ml-3 flex text-slate-200">
                <i class="ri-book-open-line"></i>
                <Link to="/" className="ml-2 hover:underline">
                  All snippets
                </Link>
              </div>
            </li>
            <li>
              <div className="ml-3 flex text-slate-200">
                <i class="ri-heart-line"></i>
                <Link to="/" className="ml-2 hover:underline">
                  Favorite snippets
                </Link>
              </div>
            </li>
          </ul>

          <br />
          
          <ul>
            <p className="text-slate-400 text-sm">Coding languages</p>
            <li>
              <div className="ml-3 flex text-slate-200">
                <i class="ri-code-line"></i>
                <Link to="/" className="ml-2 hover:underline">
                  JavaScript
                </Link>
              </div>
            </li>
            <li>
              <div className="ml-3 flex text-slate-200">
                <i class="ri-code-line"></i>
                <Link to="/" className="ml-2 hover:underline">
                  React
                </Link>
              </div>
            </li>
          </ul>

          <br />

          <ul>
            <p className="text-slate-400 text-sm">Add new snippet</p>
            <li>
              <div className="ml-3 flex text-slate-200">
              <i class="ri-add-line"></i>
                <Link to="/books/new" className="ml-2 hover:underline">
                  New snippet
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
