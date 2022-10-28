const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {

  // add plugin
  eleventyConfig.addPlugin(pluginRss);

  // pass media through
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('photos');
  eleventyConfig.addPassthroughCopy('videos');
  eleventyConfig.addPassthroughCopy('direct');
  eleventyConfig.addPassthroughCopy('admin');

  // parse datetime to readable
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromISO(dateObj, { zone: 'utc' }).toLocaleString(
      DateTime.DATE_FULL
    );
  });

  // parse datetime to html
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // directory configs:
    dir: {
      input: '.',
      includes: 'components',
      layouts: 'layouts',
      data: 'JSON',
      output: '_site',
    },
  };
};
