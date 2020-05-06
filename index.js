const axios = require('axios');
const camelcaseKeys = require('camelcase-keys');

// get all mentions for a token and a specific domain
const getMentions = async ({ domain, token }) => axios
  .get(
    `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${token}&per-page=2000`,
  )
  .then((response) => response.data)
  .then((mentions) => {
    if (!mentions || !mentions.children) {
      return [];
    }
    // For entries to be automatically created the keys in the
    // objects need to be in camelcase
    return camelcaseKeys(mentions.children);
  });

module.exports = function (api, options) {
  api.loadSource(async ({ addCollection }) => {
    const contentType = addCollection({
      typeName: options.typeName,
    });

    try {
      const mentions = await getMentions(options);

      mentions.forEach((mention) => {
        contentType.addNode(mention);
      });

      console.log(`💬 Added ${mentions.length} web mentions`);
    } catch (error) {
      console.error('Error getting web mentions');
      console.error(error);
    }
  });
};

module.exports.defaultOptions = () => ({
  typeName: 'WebMention',
});
