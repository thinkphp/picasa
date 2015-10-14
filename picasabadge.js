/* start Functions Utils */

     if(!String.prototype.parseQuery) {

       String.prototype.parseQuery = function() {

            var vars = this.split(/[&;]/);

            var rs = {};

                if(vars.length) {

                        vars.each(function(val){

                             var key = val.split("=");  

                                 if(key.length && key.length == 2) {

                                       rs[key[0]] = key[1];  
                                 }
                        });
                }     

            return rs;
       }
     }

     if(!Array.prototype.each) {

         Array.prototype.each = function(f,thisp) {

             for(var i=0;i<this.length;i++) {

               f.call(thisp,this[i],i,this);               
             }
         } 
     }

/* end Functions Utils */

//show me love to the Module Pattern
var picasabadge = function(){

        /* configuration */

        var config = {

            badgeID: 'photos',

            navigator: 'navigate',

            loadingText: 'Loading...',

            username: 'salexsorin'
        };

        /* privates vars */

        var thumbsize = '160c';

        var imgmax = '800';

        var username,navigate,badge;

        /* private method */
        function init(o) {

                    if(o && o.username) {

                         config.username = o.username; 
                    } 

                    username = config.username;

                    if(o && o.badgeid) {

                         config.badgeID = o.badgeid; 
                    } 

                    badge = $(config.badgeID);                    

                    if(o && o.navigatorid) {

                         config.navigator = o.navigatorid; 
                    } 

                    navigate = $(config.navigator);

                    var div = document.createElement('div');

                        div.setAttribute('id','loading'); 

                        div.appendChild(document.createTextNode(config.loadingText));                                       

                        badge.appendChild(div); 
 
                    if(getQueryStringValue('albumid')) { 
 
                          var url = 'http://picasaweb.google.com/data/feed/base/user/'+ username +'/albumid/'+ getQueryStringValue('albumid') +'?category=photo&alt=json&callback=picasabadge.viewPhotoList&thumbsize=' + thumbsize +'&imgmax='+imgmax;
 
                    } else { 

                          var url = 'http://picasaweb.google.com/data/feed/base/user/' + username + '?category=album&alt=json&callback=picasabadge.viewAlbumList&access=public&thumbsize=' + thumbsize 
                    }

                   loadScript(url,function(){if(window.console){console.log('Load JSON intro SCRIPT NODE:' + url);}});
       };

        /* private method */
       function getQueryStringValue(key,url) {

                   try {
                   return getQueryStringValues(url)[key];
                   }catch(e){return null;}
       } 

        /* private method */
       function getQueryStringValues(key,url) {

                   var w = window.location.href;

                   var qs = w.split("?")[1];//get the query string

                   try {
                       if(qs) {return qs.parseQuery();}
                       }catch(e){return null;}
       }

       /* private method */
      /* callback from Service for album list */
     //@param o (OBJECT JSON) - object which contains informations about albums
     //@return
     function viewAlbumList(o) {

              $('loading').parentNode.removeChild($('loading')); 

              var href = o.feed.author[0].uri.$t;

              var username = o.feed.author[0].name.$t;

              var a = document.createElement('a');

                  a.setAttribute('href',href);

                  a.appendChild(document.createTextNode('' + username + '\'s Public Gallery'));

                  a.setAttribute('title','To Picasa');  

                  a.setAttribute('class','picasalink');

             var strong = document.createElement('strong');

                 strong.appendChild(document.createTextNode(' '+' Albums ('+o.feed.entry.length+')'));   

                  navigate.appendChild(a);

                  navigate.appendChild(strong);

              var b = o.feed.entry; 

              b.each(function(item,index){

                     var title = item.title.$t;

                     var thumb = item.media$group.media$thumbnail[0].url;

                     var begin = item.id.$t.indexOf('albumid/') + 8;

                     var end = item.id.$t.indexOf('?');

                     var id = item.id.$t.slice(begin,end); 

                     var d = item.published.$t;

                     var date = d.substr(8,2) + '-' + d.substr(5,2) + '-' + d.substr(0,4);

                     var div = document.createElement('div');

                         div.setAttribute('class','image-container');

                     var a = document.createElement('a');    

                         a.setAttribute('href','?albumid='+id);

                         a.setAttribute('title',title);

                     var img = document.createElement('img');

                         img.setAttribute('src',thumb);   

                         img.setAttribute('alt',title);   

                     var p = document.createElement('p');

                         p.appendChild(document.createTextNode(title)); 

                     var p2 = document.createElement('p');

                         p2.setAttribute('class','date');   

                         p2.appendChild(document.createTextNode(date));   

                         a.appendChild(img); 

                         a.appendChild(p);

                         a.appendChild(p2);

                         div.appendChild(a);

                         badge.appendChild(div);
  
              });

     };//end function viewAlbumList

      /* private method */
     /* callback from Service for photos list */
     //@param o (OBJECT JSON) Object which contains informations about photos list
     //@return
     function viewPhotoList(o) {

              $('loading').parentNode.removeChild($('loading')); 

              var album = o.feed.title.$t;

              var href = '?albumid=';

              var a = document.createElement('a');

                  a.setAttribute('href',href);

                  a.appendChild(document.createTextNode('Back to the album list'));

                  a.setAttribute('class','backlist');

              var h2 = document.createElement('h2');

                  h2.appendChild(document.createTextNode(album));

                  navigate.appendChild(a);   

                  navigate.appendChild(h2);

              o.feed.entry.each(function(item,size){

                     var title = item.title.$t;

                     var link = item.media$group.media$content[0].url;

                     var size = item.media$group.media$content[0].width;

                     var thumb = item.media$group.media$thumbnail[0].url;

                     var begin = item.id.$t.indexOf('albumid/') + 8;

                     var end = item.id.$t.indexOf('?');

                     var id = item.id.$t.slice(begin,end); 

                     var a = document.createElement('a');

                         a.setAttribute('href',link);

                         a.setAttribute('title',title);

                         a.setAttribute('class','lightbox-album');

                     var img = document.createElement('img');

                         img.setAttribute('src',thumb);

                         img.setAttribute('alt',title);

                         a.appendChild(img);

                         badge.appendChild(a);    

              });//end each

     };//end function viewPhotoList

      /* private method */
     //@param - url (String) URI to Request
     //@param - callback function which is called when the Element 'script' is loaded
     //@return
     function loadScript(url, callback){

             var script = document.createElement("script");

                  script.type = "text/javascript";

             if (script.readyState){  //IE

                        script.onreadystatechange = function(){

                               if (script.readyState == "loaded" ||

                                          script.readyState == "complete"){

                                                 script.onreadystatechange = null;

                                                 callback();
                               }
             };

             } else {  //Others

                       script.onload = function(){

                              callback();
                       };
             }
 
             script.src = url;

             document.getElementsByTagName("head")[0].appendChild(script);

     };//end function loadScript

     //@param id (String) id of an element
     //@return HTMLElement
     function $(id) {return document.getElementById(id);}

   //return JSON OBJECT - reveal some private methods in public methods
   return {init: init,viewAlbumList: viewAlbumList,viewPhotoList: viewPhotoList};

}();//do EXEC

