import https from "https";

const url = "https://www.facebook.com/profile.php?id=61566807488658";

https
  .get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }, (res) => {
    let data = "";
    res.on("data", (c) => (data += c));
    res.on("end", () => {
      const texts = [];
      const re = /"message":\{"text":"([^"]{20,800})"/g;
      let m;
      while ((m = re.exec(data)) !== null) {
        texts.push(
          m[1]
            .replace(/\\n/g, " ")
            .replace(/\\u([\dA-Fa-f]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
        );
      }
      console.log("messages:", texts.length);
      texts.slice(0, 20).forEach((t, i) => console.log(`\n--- ${i + 1} ---\n`, t));

      const dates = [
        ...new Set(
          [...data.matchAll(/"creation_time":(\d{10})/g)].map(
            (x) => new Date(Number(x[1]) * 1000).toISOString().slice(0, 10)
          )
        ),
      ];
      console.log("\ndates:", dates);

      const imgs = [
        ...new Set(
          [...data.matchAll(/https:\\\/\\\/scontent[^"]+?\.jpg/g)].map((x) =>
            x[0].replace(/\\\//g, "/")
          )
        ),
      ];
      console.log("\nimgs:", imgs.length);
      imgs.slice(0, 15).forEach((u, i) => console.log(i + 1, u));
    });
  })
  .on("error", console.error);
