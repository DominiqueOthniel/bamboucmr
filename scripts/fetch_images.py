import re
import urllib.request

req = urllib.request.Request(
    "https://bamboucamer.com/",
    headers={"User-Agent": "Mozilla/5.0 (compatible; BambouCamerBot/1.0)"},
)
html = urllib.request.urlopen(req).read().decode("utf-8", "ignore")
pattern = r"https?://[^\"'\s>]+wp-content/uploads/[^\"'\s>]+\.(?:jpg|jpeg|png|webp)"
urls = sorted(set(re.findall(pattern, html, re.I)))
for u in urls[:40]:
    print(u)
