import fs from "fs";

const posts = JSON.parse(
  fs.readFileSync(
    "C:/Users/ONL/.cursor/projects/c-Users-ONL-Desktop-bamboucamer/agent-tools/d8a3322a-db9e-46fb-9e17-868fc95de5b0.txt",
    "utf8"
  )
);

for (const p of posts) {
  const title = p.title.rendered
    .replace(/<[^>]+>/g, "")
    .replace(/&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ");
  const content = p.content.rendered;
  const imgs = [
    ...new Set(
      [...content.matchAll(/https:\/\/bamboucamer\.com\/wp-content\/uploads\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)].map(
        (m) => m[0]
      )
    ),
  ];
  const featured =
    p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? imgs[0] ?? "";
  console.log("TITLE:", title);
  console.log("FEATURED:", featured);
  console.log("GALLERY:", imgs.join(" | "));
  console.log(
    "TEXT:",
    content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 400)
  );
  console.log("");
}
