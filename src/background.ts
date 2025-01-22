type Bang = {
  c: string
  d: string
  r: number
  s: string
  sc: string
  t: string
  u: string
}

const bangs = new Map<string, Bang>()
let maxBangLen = 0

const fetchBangs = async () => {
  const res = await fetch("https://duckduckgo.com/bang.js")
  const got = await res.json()

  let maxLen = 0

  for (const bang of got) {
    bangs.set(bang.t, bang)
    if (bang.t.length > maxLen) {
      maxLen = bang.t.length
    }
  }

  maxBangLen = maxLen
}

const fetchPromise = fetchBangs()

chrome.webRequest.onBeforeRequest.addListener(
  /// @ts-expect-error
  async ({ url }) => {
    await fetchPromise

    const urlObj = new URL(url)
    const query = urlObj.searchParams.get("q")

    if (!query || !query.includes("!")) return

    if (query.lastIndexOf("!") == query.length - 1) return

    if (query.indexOf("!") == 0) {
      let bangTag = ""

      const start = Math.min(maxBangLen, query.length)
      for (let i = start - 1; i >= 0; i--) {
        bangTag = query.substring(1, 1 + i)

        if (bangs.has(bangTag)) break
      }

      const got = bangs.get(bangTag)

      if (!got) return

      if (bangTag.length + 1 == query.length) {
        return { redirectUrl: `https://${got.d}` }
      } else {
        return { redirectUrl: got.u.replace("{{{s}}}", query.slice(bangTag.length + 1)) }
      }
    } else {
      const bangTag = query.substring(1 + query.lastIndexOf("!"))

      const got = bangs.get(bangTag)

      if (!got) return

      return { redirectUrl: got.u.replace("{{{s}}}", query.slice(0, -bangTag.length - 1)) }
    }
  },
  {
    urls: [
      "http://www.google.com/search*",
      "http://www.google.co.jp/search*",
      "http://www.google.co.uk/search*",
      "http://www.google.es/search*",
      "http://www.google.ca/search*",
      "http://www.google.de/search*",
      "http://www.google.it/search*",
      "http://www.google.fr/search*",
      "http://www.google.com.au/search*",
      "http://www.google.com.tw/search*",
      "http://www.google.nl/search*",
      "http://www.google.com.br/search*",
      "http://www.google.com.tr/search*",
      "http://www.google.be/search*",
      "http://www.google.com.gr/search*",
      "http://www.google.co.in/search*",
      "http://www.google.com.mx/search*",
      "http://www.google.dk/search*",
      "http://www.google.com.ar/search*",
      "http://www.google.ch/search*",
      "http://www.google.cl/search*",
      "http://www.google.at/search*",
      "http://www.google.co.kr/search*",
      "http://www.google.ie/search*",
      "http://www.google.com.co/search*",
      "http://www.google.pl/search*",
      "http://www.google.pt/search*",
      "http://www.google.com.pk/search*",
      "https://www.google.com/search*",
      "https://www.google.co.jp/search*",
      "https://www.google.co.uk/search*",
      "https://www.google.es/search*",
      "https://www.google.ca/search*",
      "https://www.google.de/search*",
      "https://www.google.it/search*",
      "https://www.google.fr/search*",
      "https://www.google.com.au/search*",
      "https://www.google.com.tw/search*",
      "https://www.google.nl/search*",
      "https://www.google.com.br/search*",
      "https://www.google.com.tr/search*",
      "https://www.google.be/search*",
      "https://www.google.com.gr/search*",
      "https://www.google.co.in/search*",
      "https://www.google.com.mx/search*",
      "https://www.google.dk/search*",
      "https://www.google.com.ar/search*",
      "https://www.google.ch/search*",
      "https://www.google.cl/search*",
      "https://www.google.at/search*",
      "https://www.google.co.kr/search*",
      "https://www.google.ie/search*",
      "https://www.google.com.co/search*",
      "https://www.google.pl/search*",
      "https://www.google.pt/search*",
      "https://www.google.com.pk/search*"
    ]
  },
  [
    "blocking" // needed so we can redirect the request to the websites - we aren't really blocking anything
  ]
)
