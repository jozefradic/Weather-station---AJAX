$(document).ready(function() {
  $("#btnOk").click(function(){
    var city=$("#city").val();
    var code=$("#code").val();
    if(city.length>1){
      var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
      urllink=urllink + city;
      if(code.length==2){
           urllink=urllink+','+code;
      }
      urllink=urllink+'&appid=8a493275eec43a055015e52e37ec5329';

       $.ajax({
         url: urllink,
         data : { format: 'json' } ,
         error : function(){
         // vypis chyby
         },
         dataType: 'json',
         success : function(data){
            console.log("temp:"+data.main.temp);
            console.log("desc:"+data.weather[0].description);

            $('#content').empty();
            var table=$("<table/>");

            var tr=getLine('City',city);
            table.append(tr);

            var tr=getLine('Country',data.sys.country);
            table.append(tr);

            var tr=getLine('Temperature',data.main.temp-273.15);
            table.append(tr);

            var tr=getLine('Humidity',data.main.humidity+'%');
            table.append(tr);

            var tr=getLine('Pressure',data.main.pressure+'hPa');
            table.append(tr);

           $('#content').append(table) ;

           if($("#details").is(':checked')){

            var tr=getLine('Sunrise',data.sys.sunrise);
            table.append(tr);

            var tr=getLine('Sunset',data.sys.sunset);
            table.append(tr);

            var tr=getLine('Wind',data.wind.speed);
            table.append(tr);

            var tr=getLine('MinTemp',data.main.temp_min-273.15);
            table.append(tr);

            var tr=getLine('MaxTemp',data.main.temp_max-273.15);
            table.append(tr);

            var tr=getLine('Visibility',data.weather[0].visibility);
            table.append(tr);

           }



         },

         type: 'GET'

      });

    }

  });

  function getLine(data1,data2){
      var tr=$("<tr/>");
      var td1=$("<td/>");
      $(td1).append(data1);
        var td2=$("<td/>");
        $(td2).append(data2);
        tr.append(td1);
        tr.append(td2);
        return tr;


  
};
});