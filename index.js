var window = window;

var game =
{
  canvas: function ()
  {
    var canvas = window.document.createElement ('canvas');
        canvas.context = canvas.getContext ('2d');

        canvas.clear = function ()
        {
          canvas.context.clearRect (0, 0, canvas.width, canvas.height);
        };

        canvas.resize = function (force)
        {
          if ((force) || (game.event.type == 'resize') || (game.event.type == 'run'))
          canvas.height = window.innerHeight;
          canvas.width = window.innerWidth;
        };

    game.canvas = canvas;

    window.document.body.appendChild (canvas);
  },

  create:
  {
    set town (json)
    {
      var town = {};
          town.id = game.data.number.town; game.data.number.town++;
          town.name = (json.name) ? json.name : game.random (game.data.name.town) + ' ' + town.id;
          town.x = (json.x) ? json.x : game.random (0, game.canvas.width);
          town.y = (json.y) ? json.y : game.random (0, game.canvas.height);

          town.update = function ()
          {

          };

      game.data.town[town.id] = town;
    }
  },

  data:
  {
    name:
    {
        town:
        [
          'Amsterdam',
          'Beijing',
          'Berlin',
          'Moscow',
          'Paris',
          'Tokyo'
        ]
    },

    number:
    {
      town: 0
    },

    town: {}
  },

  draw: function ()
  {
    game.canvas.clear ();

    if (game.scene > 0)
    {
      for (var i = 0; i < game.scene.length; i++)
      {
        game.scene [i] ();
      };
    };

    game.scene = [];
  },

  event: {},

  generate:
  {
    map: function ()
    {
      game.generate.town ();
    },

    town: function ()
    {
      for (var i = 0; i < game.option.town.number; i++)
      {
        game.create.town = {};
      }
    }
  },

  set log (string)
  {
    window.console.log (string);
  },

  option:
  {
    interval: 1000,

    town:
    {
      number: 3
    }
  },

  random: function (min, max, float)
  {
    var random;

    if ((min) && (!max))
    {
        random = Math.floor (Math.random () * min.length);
        random = min [random];
    };

    if (max)
    {
      if (float)
      {
        random = Math.random () * (max - min) + min;
      }
      else
      {
        random = Math.floor (Math.random () * (max - min + 1) + min);
      };
    };

    return random;
  },

  run: function ()
  {
    game.canvas ();

    game.generate.map ();

    game.event.type = 'run';
    game.update ();

    window.onload = function () { game.event = event; game.update (); };
    window.onmousedown = function () { game.event = event; game.update (); };
    window.onmouseup = function () { game.event = event; game.update (); };
    window.onresize = function () { game.event = event; game.update (); };

    window.setInterval (function () { game.event = {type: 'tick'}; game.update (); }, game.option.interval);
  },

  scene: [],

  update: function ()
  {
    game.log = game.event.type;

    game.canvas.resize ();

    for (var id in game.data.town)
    {
      game.data.town[id].update ();
    };
  }
};

game.run ();
