import re
import urllib.request
from pathlib import Path

req = urllib.request.Request(
    "https://bamboucamer.com/",
    headers={"User-Agent": "Mozilla/5.0"},
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")

imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
for i in imgs:
    if "logo" in i.lower() or "whatsapp" in i.lower():
        print("candidate:", i)

logo_url = None
if not logo_url:
    logo_url = "https://bamboucamer.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-07-23-at-10.51.53.jpeg"

if logo_url.startswith("/"):
    logo_url = "https://bamboucamer.com" + logo_url

print("using:", logo_url)
out = Path(__file__).resolve().parents[1] / "public" / "logo.jpg"
req2 = urllib.request.Request(logo_url, headers={"User-Agent": "Mozilla/5.0"})
data = urllib.request.urlopen(req2, timeout=30).read()
out.write_bytes(data)
print("saved:", out, len(data), "bytes")
