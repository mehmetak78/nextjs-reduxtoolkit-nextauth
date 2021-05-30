
- New React project
    - Change create-react-app to create-next-app

- npm run dev

----

- npm insall sass
- You can use .module.scss files now after. Just like .module.css
    Sample:
        import classes from "./Layout.module.scss";
        <main className={classes.main}>{props.children}</main>
- delete api folder under pages
- delete Home.module.css

- Create a React component in index.js which will be the home page. (The root path:  / )

- The file name under pages directory will be the path name also.
    - For ex. The react component in the index.js will be reached under the path : /news

- Folders will also be the path
    - pages/news/index.js           will be reached under the path /news

- The file name within [] can be any other paths in the folder.  /*
    - If not matches with any other file name in the folder, this file will be opened under this path
    - useRouter hook can be used to get the parameters inside []

- Link
    <li><Link href='/news/daily-news'> Daily News</Link></li>

- _app.js is the general wrapper component for all pages.

- Page Re-rendering
    - Static Site Generation (SSG)
    - Server Site Rendering (SSR)
  will be better for SEO

- API Routing
    -API endpoints which run in server site.

- Mongodb
    - npm install mongodb




- HATA
    "ChunkLoadError: Loading chunk node_modules_next_dist_client_dev_noop_js failed"
    - Delete the .next folder under the project root in webstorm



