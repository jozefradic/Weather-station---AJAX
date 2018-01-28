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

            $('#content').empty();      //vykreslovanie tabulky prvej
            var table=$("<table/>");
            table.addClass("line");     //toto prida do kazdeho riadku hodi class="line"

            var tr=getLine('City :',city);
            table.append(tr);

            var tr=getLine('Country :',data.sys.country);
            table.append(tr);

            var tr=getLine('Temperature :',data.main.temp-273.15+'°C');
            table.append(tr);

            var tr=getLine('Humidity :',data.main.humidity+'%');
            table.append(tr);

            var tr=getLine('Pressure :',data.main.pressure+'hPa');
            table.append(tr);

           $('#content').append(table) ;

           if($("#details").is(':checked')){    //vykreslenie detailu

            var tr=getLine('Sunrise :',new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
            table.append(tr);

            var tr=getLine('Sunset :',new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
            table.append(tr);

            var tr=getLine('Wind :',data.wind.speed+' km/h');
            table.append(tr);

            var tr=getLine('MinTemp :',data.main.temp_min-273.15+'°C');
            table.append(tr);

            var tr=getLine('MaxTemp :',data.main.temp_max-273.15+'°C');
            table.append(tr);

            var tr=getLine("Map's location :", "<a target='_blank' href='https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon + "'>"+city+"</a>");
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