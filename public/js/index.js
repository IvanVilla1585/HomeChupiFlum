
(function (window, document, $, undefined) {
  (function () {
    return parquiadero = {
      KEY: '&APPID=23ba3c1105c9bcab61a6b380771d3bc8',
      URL_WATHER: 'http://api.openweathermap.org/data/2.5/forecast/city?q=',
      IMG_WEATHER: "http://openweathermap.org/img/w/",
      PRICE_DOLAR: 'https://s3.amazonaws.com/dolartoday/data.json',
      $nombre: $('#nombre'),
      $icon: $('#icon'),
      $temp: $('#temp'),
      $descripcion: $('#descripcion'),
      $ciudad: $('#cityAdd'),
      $botonBuscar: $('#search'),
      $info: $('.data_time_info'),
      $price: $('#price'),
      $carrousel: $("#carrousel"),
      $slides: $(".rslides"),
      $siguiente: $("#siguiente"),
      $fechai: $("#fechai"),
      $horai: $("#horai"),
      $fechasa: $("#fechasa"),
      $horasa: $("#horasa"),
      $inputs_info: $("#inputs_info"),
      $inputs: $("#inputs"),

      Init: function () {
        //this.peticion('Rio Negro,CO')
        //this.escucharConsulta()
        //this.iniciarCarrusel()
        this.iniciarSlides()
        this.escucharSiguiente()
        //this.iniciarDatePicker()
        //this.iniciarGoogleMaps()
      },

      peticion: function (ciudad) {
        var self = this
        var peticion = self.URL_WATHER + ciudad + self.KEY
        $.getJSON(peticion, function (data) {
          var ciudad = {
            nombre: data.city.name,
            pais: data.city.country,
            temperatura: data.list[0].main.temp - 273.15,
            tiempo: data.list[0].weather[0].description,
            icon: self.IMG_WEATHER + data.list[0].weather[0].icon + ".png",
            estado: data.list[0].weather[0].main
          }
          self.$nombre.text(ciudad.nombre + ' ' + ciudad.pais)
          self.$icon.attr('src', ciudad.icon)
          self.$temp.text(ciudad.temperatura.toFixed(2) + ' °C')
          self.$descripcion.text(ciudad.tiempo)
          console.log(data)
        })
        $.getJSON(self.PRICE_DOLAR, function (data) {
          self.$price.text(data.USDCOL.ratetrm)
        })
      },

      iniciarGoogleMaps: function () {
        // Note that the browser fullscreen (triggered by short keys) might
        // be considered different from content fullscreen when expecting a boolean
        return ((document.fullscreenElement && document.fullscreenElement !== null) ||    // alternative standard methods
            document.mozFullScreen || document.webkitIsFullScreen);                   // current working methods
      },

      iniciarDatePicker: function () {
        this.$fechai.datepicker({
          changeMonth: true,
          changeYear: true
        })
        this.$fechai.datepicker({
          changeMonth: true,
          changeYear: true
        })
      },

      iniciarSlides: function () {
        this.$slides.responsiveSlides()
      },

      iniciarCarrusel: function () {
        this.$carrousel.owlCarousel({

              autoPlay: 2000, //Set AutoPlay to 3 seconds

              items : 3,
              itemsDesktop : [1199,3],
              itemsDesktopSmall : [979,3],
              pagination: false,
              navigation: false

          });
      },

      escucharConsulta: function (){
          var self = this
          self.$botonBuscar.on('click', function (e) {
            e.preventDefault();
            self.peticion(self.$ciudad.val())
          })
      },

      escucharSiguiente: function () {
        var self = this
        self.$siguiente.on('click', function (evt) {
          evt.preventDefault()
          var fechai = self.$fechai.val()
          var horai = self.$horai.val()
          var fechasa = self.$fechasa.val()
          var horasa = self.$horasa.val()
          if (fechai == "" || fechasa ==  "" || fechasa == "" || horasa == ""){
            alert("Debe ingresar todos los datos")
            return false
          }else{
            self.$inputs.css('display', 'none')
            self.$inputs_info.css('display', 'block').fadeIn()
          }
        })
      },

      initMap: function () {
        var myLatLng = {lat: -25.363, lng: 131.044};

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          scrollwheel: false,
          zoom: 4
        });

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
          map: map,
          position: myLatLng,
          title: 'Hello World!'
        });
      }
    }
  }) ()

  parquiadero.Init()

}) (window, document, $, undefined)
