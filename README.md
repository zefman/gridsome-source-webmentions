# @zefman/gridsome-source-webmention

> Webmentions source for Gridsome 💬

Loads webmentions from [https://webmention.io](https://webmention.io)

If you don't know what a webmention is give 
this a read: [https://en.wikipedia.org/wiki/Webmention](https://en.wikipedia.org/wiki/Webmention)

Setting up webmentions is quite an involved process, I wrote a step by step guide here:
[Pixelhop: Getting Started with Gridsome Webmentions](https://pixelhop.io/writing/2020/05/get-started-with-webmentions-in-gridsome/)

## Install
- `npm install @zefman/gridsome-source-webmention`
- `yarn add @zefman/gridsome-source-webmention`

## Usage

Add the plugin in `gridsome.config.js`

```js
export default {
  plugins: [
    {
      use: '@zefman/gridsome-source-webmention',
      options: {
        domain: 'pixelhop.io', // Your webmention domain
        token: 'your-token', // Your secret webmention token
      },
    }
  ]
}
```

Example query to load a pages webmentions

```
<page-query>
  query($path: String!) {
    mentions: allWebMention(filter: { wmTarget: { regex: $path } }) {
      edges {
        node {
          wmId
          url
          wmProperty
          wmSource
          content {
            text
          }
          author {
            name
            photo
            url
          }
        }
      }
    }
  }
</page-query>
```

## Todo

* Handle webmention.io pagination. Currently limited to 2000 mentions