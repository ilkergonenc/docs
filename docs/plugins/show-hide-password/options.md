## Options

| Name               | Type    | Default                            | Description |
|--------------------|---------|------------------------------------|-------------|
| iconHidden         | string  | '<i class="far fa-eye-slash"></i>' |             |
| iconShown          | string  | '<i class="far fa-eye"></i>'       |             |
| tooltip            | boolean | true                               |             |
| tooltipHiddenTitle | string  | 'Show password'                    |             |
| tooltipShownTitle  | string  | 'Hide password'                    |             |


<button>TEST</button>  

```html
<example title='Examples Board'>
  <example-tabs>
    <example-tab preview include='./example.html' />
    <example-tab code='html' include='./example.html' />
    <example-tab code='js' include='./example.js' />
    <example-tab code='css' include='../other/example.css' />
  </example-tabs>
</example>
```

```pug
// - clipboard mixin usages
+clipboard({
  "preview": "./example.html",
  "html": "./example.html",
  "js": "./example.js",
  "css": "../other/example.css",
})

+clipboard("html", "./example.html")

+clipboard("plain", "./plain.txt")
```
