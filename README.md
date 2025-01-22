# boogle

Automatically use DuckDuckGo for [Bangs](https://duckduckgo.com/bang), keeping Google for all other searches.

Fork of https://github.com/vantezzen/bangs-for-google.

## Installation

Install from [addons.mozzila.org](https://addons.mozilla.org/en-GB/firefox/addon/boogle/). Due to how the extension requiring the
webRequestBlocking API, which is not in Manifest V3, it is not availible for Google Chrome.

## Building from source

Requirements:
- `tsc`
- `zip`
- `make`.

To build, do:

```
make
```

To clean artifacts, run:

```
make clean
```

## License
The extension is licensed under the MIT License.
