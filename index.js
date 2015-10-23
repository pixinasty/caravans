var window = window;

var game =
{
  canvas:
  {
    autosize: function ()
    {
      if ((game.event.type == 'resize') || (game.event.type == 'load'))
      {
        if
        (
          (game.canvas.height != window.innerHeight) ||
          (game.canvas.width != window.innerWidth)
        )
        {
          game.canvas.height = window.innerHeight;
          game.canvas.width = window.innerWidth;

          for (var id in game.canvas)
          {
            switch (id)
            {
              case 'autosize': break;
              case 'height': break;
              case 'part': break;
              case 'width': break;
              default:
                game.canvas[id].height = game.canvas.height;
                game.canvas[id].width = game.canvas.width;
            };
          };
        };
      };
    },

    part: function (part)
    {
      return Math.floor (Math.min (game.canvas.width, game.canvas.height) / part);
    }
  },

  create:
  {
    canvas: function (id, layer)
    {
      var canvas = window.document.createElement ('canvas');
          canvas.context = canvas.getContext ('2d');
          canvas.id = id;
          canvas.style.zIndex = (layer) ? layer : 0;

      game.canvas[id] = canvas;

      window.document.body.appendChild (canvas);
    },

    set city (json)
    {
      var city = {};
          city.id = (json.id) ? json.id : game.object.city.length;
          city.mouseout = true;
          city.name = json.name;
          city.r = (json.r) ? json.r : game.canvas.part (64);
          city.x = (json.x) ? json.x : game.random (0, game.canvas.width);
          city.y = (json.y) ? json.y : game.random (0, game.canvas.height);


          city.info = function (context)
          {
            var event = game.event;
            if (event.type == 'mousemove')
            {
              var d = Math.sqrt (Math.pow (event.x - city.x, 2) + Math.pow (event.y - city.y, 2));
              if (d < city.r)
              {
                if (city.mouseout)
                {
                  var text = city.name;
                  city.mouseout = false;
                  context.font = game.option.font.size + ' ' + game.option.font.family;
                  context.fillText (text, city.x, city.y - game.canvas.part (32));
                };
              }
              else
              {
                if (!city.mouseout)
                {
                  context.clearRect (city.x, city.y - game.canvas.part (16), 70, 25);
                  city.mouseout = true;
                };
              };
            };
          };

          city.show = function (context)
          {
            if ((game.event.type == 'run') || (game.event.type == 'resize'))
            {
              context.beginPath ();
              context.arc (city.x, city.y, city.r, 0, 2 * Math.PI);
              context.stroke ();
            };
          };

          city.update = function ()
          {
            city.info (game.canvas.background.context);
            city.show (game.canvas.background.context);
          };

      game.object.city[city.id] = city;
    }
  },

  draw:
  {

  },

  event: {},

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

    window.onmousemove = function (event)
    {
      game.update (event);
    };

    window.onresize = function ()
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
    game.event.type = 'load';

    game.create.canvas ('background', 0);
    game.canvas.autosize ();

    game.object.cities.create (game.option.city.number);

    game.events ();
  },

  set log (message)
  {
    window.console.log (message);
  },

  object:
  {
    cities:
    {
      create: function (number)
      {
          for (var i = 0; i < number; i++)
          {
            var name = game.random (game.option.city.names) + ' ' + i;
            game.create.city =
            {
              id: i,
              name: name
            };
          };
      },

      update: function ()
      {
        for (var id in game.object.city)
        {
          game.object.city[id].update ();
        };
      }
    },
    city: {}
  },

  option:
  {
    city:
    {
        names:
        [
          'Berlin',
          'Moscow',
          'New York',
          'Paris',
          'Tokyo'
        ],

        number: 3
    },

    font:
    {
      family: 'Arial',
      size: '12px'
    },

    interval: 1000
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
    game.load ();
    game.update ({type: 'run'});
  },

  update: function (event)
  {
    game.event = event;
    game.info = 'Event: ' + event.type;

    game.canvas.autosize ();

    game.object.cities.update ();
  }
};

game.run ();
