import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const OUT = path.join(process.cwd(), "public", "news");
fs.mkdirSync(OUT, { recursive: true });

const images = [
  {
    url: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture2-4.jpg",
    file: "seco-2025.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture3-3.jpg",
    file: "bansoa-5ha.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1-2.jpg",
    file: "siprome-2024.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1.jpg",
    file: "sud-kivu.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1-3.jpg",
    file: "dschang-eboulement.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture3-1.jpg",
    file: "startupper-2024.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2025/12/src_img_CD1211FR_SOFO_img13-scaled.jpg",
    file: "mont-bamboutos.jpg",
  },
  {
    url: "https://bamboucamer.com/wp-content/uploads/2025/12/coffee-rizetiana.png",
    file: "coffea-rhizomatosa.png",
  },
  {
    url: "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/612380571_122200126598560249_7686254075340105957_n.jpg?stp=dst-jpg_tt6&cstp=mx720x1080&ctp=p526x296&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=awQWALHYHIwQ7kNvwHDuoWL&_nc_oc=Ado3uKVgcv5BGqf0M0QP_HCEo8qSqIbLGelRIRYR5gWE42Ogz_-XqF1_5Qxl7PsOe-k&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&oh=00_AQCLNDu7xf_0oxI9HcgXe0n3cW14NZ86n8bGNCJwGFLNFw&oe=6A544ACB",
    file: "voeux-2026.jpg",
  },
  {
    url: "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/597594603_122195893196560249_1336999555888398871_n.jpg?stp=c0.82.744.744a_dst-jpg_tt6&cstp=mx744x744&ctp=s160x160&_nc_cat=108&ccb=1-7&_nc_sid=8a6525&_nc_ohc=CzAW2Nsj1zAQ7kNvwHY3JhP&_nc_oc=AdpEtnRcTSsb4v1TOuSZXJcpfCIfukLMXgr4K-aUtQS9xu0fgy71OHJ37o69gHZIV9g&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&oh=00_AQA6zG4DMIIk_POSEAS9lgKmOf3nj_vMvc3Ys3yLVoga9w&oe=6A544957",
    file: "facebook-activite-1.jpg",
  },
  {
    url: "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/598517082_122195893142560249_7766420012518898114_n.jpg?stp=c124.0.744.744a_dst-jpg_tt6&cstp=mx744x744&ctp=s160x160&_nc_cat=107&ccb=1-7&_nc_sid=8a6525&_nc_ohc=P6MMT8bY0YEQ7kNvwEt0Dpk&_nc_oc=AdqcpwLA70WH6QAKjIUKU4WW9-SVG2pB2eptQrkH30t-ycxQMG4Z9CXS3-7qCU3qucE&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&oh=00_AQALD1zUSDl0-RMgKZTuPFmiUZTCYvzS3gqRB9LVIWHtVQ&oe=6A54692B",
    file: "facebook-activite-2.jpg",
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`${url} -> ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
      file.on("error", reject);
    });
    req.on("error", reject);
  });
}

for (const { url, file } of images) {
  const dest = path.join(OUT, file);
  try {
    await download(url, dest);
    const size = fs.statSync(dest).size;
    console.log("OK", file, size, "bytes");
  } catch (e) {
    console.log("FAIL", file, e.message);
  }
}
