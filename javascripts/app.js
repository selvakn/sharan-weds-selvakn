var mapsLoaded = false;
function initialize() {
  if(mapsLoaded) { return }
  var cbe = {element: "#cbe .map_canvas",
    latLng: new google.maps.LatLng(11.011981,76.949787),
    title: "Rajasthani Sangh",
    zoomLevel: 16,
    mapType: google.maps.MapTypeId.ROADMAP,
    info: "<div><strong>Rajasthani Sangh Bhavan</strong></div><div><a href='http://maps.google.com/maps/place?cid=15145243433214722012' target='_blank'>more info >></a></div><div><span>No 579, DB Road, R.S. Puram,</span></div><div><span>Coimbatore, Tamil Nadu 641002, India</span></div><div><span>0422 255 1775</span></div>"
  },
  rasipuram = {
    element: "#rasipuram .map_canvas",
    latLng: new google.maps.LatLng(11.450973,78.205735),
    title: "Kongu Vellalar Thirumana Mandapam",
    zoomLevel: 16,
    mapType: google.maps.MapTypeId.HYBRID,
    info: "<div><strong>Kongu Vellalar Thirumana Mandapam</strong></div><div>Senthamangalam Pirivu Road</div><div>Rasipuram, Tamil Nadu 637408, India</div>"
  };
  _initMaps(cbe);
  _initMaps(rasipuram);
  mapsLoaded = true;
}

function _initMaps(location){
  var mapOptions = {
    zoom: location.zoomLevel,
    center: location.latLng,
    mapTypeId: location.mapType
  }
  var map = new google.maps.Map($(location.element)[0], mapOptions);
  var marker = new google.maps.Marker({
    position: location.latLng,
    map: map,
    title: location.title
  });
  var infowindow = new google.maps.InfoWindow({
    maxWidth: 450,
    content: location.info
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

}

var app = $.sammy(function(){
  this.setLocationProxy(new Sammy.PushLocationProxy(this));

  var context = this;
  $.each(["index", "events", "photos", "rsvp", "guestbook"], function(i, path){
    var pathname = "/" + path + ".html";
    context.get(pathname, function() {
      var targetID = path;
      if($(".active")[0] === undefined){
        $("#" + targetID).show().addClass("active");
        if(path == "events") { initialize(); }
      }else{
        $(".active").fadeOut("slow", function(){
          $("#" + targetID).fadeIn("slow", function(){
            if(path == "events") { initialize(); }
          }).addClass("active");
        }).removeClass("active");
      }

    });
  });
  context.get("/", function(){
    $("#index").show().addClass("active");
  });
});

$(document).ready(function(){
  app.run(window.location.pathname);
});
