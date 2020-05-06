# @zefman/gridsome-source-webmentions

> Webmentions source for Gridsome 💬

Loads webmentions from [https://webmention.io](https://webmention.io)

I will write a tutorial soon on how to set up webmentions with Gridsome using this plugin, in the meantime if you don't know what a webmention is give 
this a read: (https://en.wikipedia.org/wiki/Webmention)[https://en.wikipedia.org/wiki/Webmention]

## Install
- `npm install @zefman/gridsome-source-webmentions`
- `yarn add @zefman/gridsome-source-webmentions`

## Usage

Add the plugin in `gridsome.config.js`

```js
export default {
  plugins: [
    {
      use: '@zefman/gridsome-source-webmentions',
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

* Write blog post explaining usage
* Handle webmention.io pagination. Currently limited to 2000 mentions