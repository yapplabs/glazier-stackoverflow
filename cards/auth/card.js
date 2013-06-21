import 'conductor' as Conductor;

// If you need them, you can require additional vendored javascript files from Glazier:
Conductor.require('/vendor/jquery.js');
// Conductor.require('/vendor/handlebars.js');
// Conductor.require('/vendor/ember-latest.js');
// Conductor.require('/vendor/loader.js');

Conductor.requireCSS('card.css');

var card = Conductor.card({
  consumers: {
    'repository': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    if (!dimensions) {
      dimensions = {
        width: 500,
        height: 300
      };
    }

    document.body.innerHTML = "<div id=\"card\">Hello Bootstrap.  Click me.</div>";
  },

  activate: function() {
    card.consumers.repository.request('getRepository').then(function(name) {
      $('#card').click(function() {
        alert('You clicked me in ' + name);
      });
    });
  },

  resize: function(dimensions) {
    var width = Math.min(dimensions.width, 500);
    var height = Math.min(dimensions.height, 500);

    $('body>div').css({
      width: width
    });
  }
});

export = card;

