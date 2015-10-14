var window = window;

var game =
{
  canvas:
  {
    autosize: function ()
    {
        game.canvas.height = window.innerHeight;
        game.canvas.width = window.innerWidth;

        for (var id in game.canvas)
        {
          switch (id)
          {
            case 'autosize': break;
            case 'height': break;
            case 'width': break;
            default:
              game.canvas[id].height = game.canvas.height;
              game.canvas[id].width = game.canvas.width;
          };
        };
    }
  },

  create:
  {
    canvas: function (id, layer)
    {
      var canvas = window.document.createElement ('canvas');
          canvas.id = id;
          canvas.style.zIndex = (layer) ? layer : 0;

      game.canvas[id] = canvas;

      window.document.body.appendChild (canvas);
    }
  },

  events: function ()
  {
    window.onload = function (event)
    {
      game.update (event);
    };

    window.onmousedown = function (event)
    {
      game.update (event);
    };

    window.setInterval
    (
      function ()
      {
        game.update ({type: 'tick'});
      },
      game.option.interval
    );
  },

  set info (message)
  {
    window.console.info (message);
  },

  load: function ()
  {
    game.create.canvas ('background', 0);

    game.events ();
  },

  set log (message)
  {
    window.console.log (message);
  },

  option:
  {
    interval: 1000
  },

  run: function ()
  {
    game.load ();
    game.update ({type: 'run'});
  },

  update: function (event)
  {
    game.info = 'Event: ' + event.type;
      switch (event.type)
      {
        case 'run':

        break;
      };
  }
};

game.run ();
