const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const md = require('markdown-it')({ html: false });


// Allows us to input inline markdown, mainly to support inline bolding
Handlebars.registerHelper('markdown', function(str) {
  if (!str) return '';
  const rendered = md.renderInline(str); // renderInline avoids wrapping <p>
  return new Handlebars.SafeString(rendered);
});

// Join helper, used mainly for comma separation or |'s
Handlebars.registerHelper('join', function(arr, separator) {
  if (!Array.isArray(arr)) return '';
  return arr.join(typeof separator === 'string' ? separator : ', ');
});

module.exports = {
  render: function(resume) {
    const templatePath = path.join(__dirname, 'resume.hbs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiled = Handlebars.compile(template);
    return compiled(resume);
  }
};
