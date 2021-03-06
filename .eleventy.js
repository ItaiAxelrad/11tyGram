const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const hashtag = require('markdown-it-hashtag');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

  // add plugin
  eleventyConfig.addPlugin(pluginRss);

  // set deep merge to true
  eleventyConfig.setDataDeepMerge(true);
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

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: false,
  }).use(hashtag);
  
  eleventyConfig.setLibrary('md', markdownLibrary);

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
