!function r(h,o,s){function g(e,t){if(!o[e]){if(!h[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(c)return c(e,!0);var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}var n=o[e]={exports:{}};h[e][0].call(n.exports,function(t){return g(h[e][1][t]||t)},n,n.exports,r,h,o,s)}return o[e].exports}for(var c="function"==typeof require&&require,t=0;t<s.length;t++)g(s[t]);return g}({1:[function(t,e,i){"use strict";i.__esModule=!0;var a=(n.prototype.get=function(t){var e,i,a=Math.floor(t*this.colors.length);a>=this.colors.length-1?e=i=this.colors[this.colors.length-1]:(e=this.colors[a],i=this.colors[a+1]);for(var n=[0,0,0],r=0;r<n.length;r++)n[r]=255*(e[r]+(i[r]-e[r])*(t-a));return n},n);function n(t){this.colors=t}i.COLOR_MAP=new a([[.267004,.004874,.329415],[.26851,.009605,.335427],[.269944,.014625,.341379],[.271305,.019942,.347269],[.272594,.025563,.353093],[.273809,.031497,.358853],[.274952,.037752,.364543],[.276022,.044167,.370164],[.277018,.050344,.375715],[.277941,.056324,.381191],[.278791,.062145,.386592],[.279566,.067836,.391917],[.280267,.073417,.397163],[.280894,.078907,.402329],[.281446,.08432,.407414],[.281924,.089666,.412415],[.282327,.094955,.417331],[.282656,.100196,.42216],[.28291,.105393,.426902],[.283091,.110553,.431554],[.283197,.11568,.436115],[.283229,.120777,.440584],[.283187,.125848,.44496],[.283072,.130895,.449241],[.282884,.13592,.453427],[.282623,.140926,.457517],[.28229,.145912,.46151],[.281887,.150881,.465405],[.281412,.155834,.469201],[.280868,.160771,.472899],[.280255,.165693,.476498],[.279574,.170599,.479997],[.278826,.17549,.483397],[.278012,.180367,.486697],[.277134,.185228,.489898],[.276194,.190074,.493001],[.275191,.194905,.496005],[.274128,.199721,.498911],[.273006,.20452,.501721],[.271828,.209303,.504434],[.270595,.214069,.507052],[.269308,.218818,.509577],[.267968,.223549,.512008],[.26658,.228262,.514349],[.265145,.232956,.516599],[.263663,.237631,.518762],[.262138,.242286,.520837],[.260571,.246922,.522828],[.258965,.251537,.524736],[.257322,.25613,.526563],[.255645,.260703,.528312],[.253935,.265254,.529983],[.252194,.269783,.531579],[.250425,.27429,.533103],[.248629,.278775,.534556],[.246811,.283237,.535941],[.244972,.287675,.53726],[.243113,.292092,.538516],[.241237,.296485,.539709],[.239346,.300855,.540844],[.237441,.305202,.541921],[.235526,.309527,.542944],[.233603,.313828,.543914],[.231674,.318106,.544834],[.229739,.322361,.545706],[.227802,.326594,.546532],[.225863,.330805,.547314],[.223925,.334994,.548053],[.221989,.339161,.548752],[.220057,.343307,.549413],[.21813,.347432,.550038],[.21621,.351535,.550627],[.214298,.355619,.551184],[.212395,.359683,.55171],[.210503,.363727,.552206],[.208623,.367752,.552675],[.206756,.371758,.553117],[.204903,.375746,.553533],[.203063,.379716,.553925],[.201239,.38367,.554294],[.19943,.387607,.554642],[.197636,.391528,.554969],[.19586,.395433,.555276],[.1941,.399323,.555565],[.192357,.403199,.555836],[.190631,.407061,.556089],[.188923,.41091,.556326],[.187231,.414746,.556547],[.185556,.41857,.556753],[.183898,.422383,.556944],[.182256,.426184,.55712],[.180629,.429975,.557282],[.179019,.433756,.55743],[.177423,.437527,.557565],[.175841,.44129,.557685],[.174274,.445044,.557792],[.172719,.448791,.557885],[.171176,.45253,.557965],[.169646,.456262,.55803],[.168126,.459988,.558082],[.166617,.463708,.558119],[.165117,.467423,.558141],[.163625,.471133,.558148],[.162142,.474838,.55814],[.160665,.47854,.558115],[.159194,.482237,.558073],[.157729,.485932,.558013],[.15627,.489624,.557936],[.154815,.493313,.55784],[.153364,.497,.557724],[.151918,.500685,.557587],[.150476,.504369,.55743],[.149039,.508051,.55725],[.147607,.511733,.557049],[.14618,.515413,.556823],[.144759,.519093,.556572],[.143343,.522773,.556295],[.141935,.526453,.555991],[.140536,.530132,.555659],[.139147,.533812,.555298],[.13777,.537492,.554906],[.136408,.541173,.554483],[.135066,.544853,.554029],[.133743,.548535,.553541],[.132444,.552216,.553018],[.131172,.555899,.552459],[.129933,.559582,.551864],[.128729,.563265,.551229],[.127568,.566949,.550556],[.126453,.570633,.549841],[.125394,.574318,.549086],[.124395,.578002,.548287],[.123463,.581687,.547445],[.122606,.585371,.546557],[.121831,.589055,.545623],[.121148,.592739,.544641],[.120565,.596422,.543611],[.120092,.600104,.54253],[.119738,.603785,.5414],[.119512,.607464,.540218],[.119423,.611141,.538982],[.119483,.614817,.537692],[.119699,.61849,.536347],[.120081,.622161,.534946],[.120638,.625828,.533488],[.12138,.629492,.531973],[.122312,.633153,.530398],[.123444,.636809,.528763],[.12478,.640461,.527068],[.126326,.644107,.525311],[.128087,.647749,.523491],[.130067,.651384,.521608],[.132268,.655014,.519661],[.134692,.658636,.517649],[.137339,.662252,.515571],[.14021,.665859,.513427],[.143303,.669459,.511215],[.146616,.67305,.508936],[.150148,.676631,.506589],[.153894,.680203,.504172],[.157851,.683765,.501686],[.162016,.687316,.499129],[.166383,.690856,.496502],[.170948,.694384,.493803],[.175707,.6979,.491033],[.180653,.701402,.488189],[.185783,.704891,.485273],[.19109,.708366,.482284],[.196571,.711827,.479221],[.202219,.715272,.476084],[.20803,.718701,.472873],[.214,.722114,.469588],[.220124,.725509,.466226],[.226397,.728888,.462789],[.232815,.732247,.459277],[.239374,.735588,.455688],[.24607,.73891,.452024],[.252899,.742211,.448284],[.259857,.745492,.444467],[.266941,.748751,.440573],[.274149,.751988,.436601],[.281477,.755203,.432552],[.288921,.758394,.428426],[.296479,.761561,.424223],[.304148,.764704,.419943],[.311925,.767822,.415586],[.319809,.770914,.411152],[.327796,.77398,.40664],[.335885,.777018,.402049],[.344074,.780029,.397381],[.35236,.783011,.392636],[.360741,.785964,.387814],[.369214,.788888,.382914],[.377779,.791781,.377939],[.386433,.794644,.372886],[.395174,.797475,.367757],[.404001,.800275,.362552],[.412913,.803041,.357269],[.421908,.805774,.35191],[.430983,.808473,.346476],[.440137,.811138,.340967],[.449368,.813768,.335384],[.458674,.816363,.329727],[.468053,.818921,.323998],[.477504,.821444,.318195],[.487026,.823929,.312321],[.496615,.826376,.306377],[.506271,.828786,.300362],[.515992,.831158,.294279],[.525776,.833491,.288127],[.535621,.835785,.281908],[.545524,.838039,.275626],[.555484,.840254,.269281],[.565498,.84243,.262877],[.575563,.844566,.256415],[.585678,.846661,.249897],[.595839,.848717,.243329],[.606045,.850733,.236712],[.616293,.852709,.230052],[.626579,.854645,.223353],[.636902,.856542,.21662],[.647257,.8584,.209861],[.657642,.860219,.203082],[.668054,.861999,.196293],[.678489,.863742,.189503],[.688944,.865448,.182725],[.699415,.867117,.175971],[.709898,.868751,.169257],[.720391,.87035,.162603],[.730889,.871916,.156029],[.741388,.873449,.149561],[.751884,.874951,.143228],[.762373,.876424,.137064],[.772852,.877868,.131109],[.783315,.879285,.125405],[.79376,.880678,.120005],[.804182,.882046,.114965],[.814576,.883393,.110347],[.82494,.88472,.106217],[.83527,.886029,.102646],[.845561,.887322,.099702],[.85581,.888601,.097452],[.866013,.889868,.095953],[.876168,.891125,.09525],[.886271,.892374,.095374],[.89632,.893616,.096335],[.906311,.894855,.098125],[.916242,.896091,.100717],[.926106,.89733,.104071],[.935904,.89857,.108131],[.945636,.899815,.112838],[.9553,.901065,.118128],[.964894,.902323,.123941],[.974417,.90359,.130215],[.983868,.904867,.136897],[.993248,.906157,.143936]])},{}],2:[function(t,e,i){"use strict";i.__esModule=!0;var n=t("./colormap"),f=400;function h(t,e){return t<e[0]?e[0]:t>=e[1]?e[1]:t}function o(t){for(var e=t[0],i=0,a=1;a<t.length;a++)t[a]<e&&(e=t[a],i=a);return i}var d=(a.prototype.get=function(t,e){return this.data[t*this.width+e]},a.prototype.set=function(t,e,i){this.min=Math.min(this.min,i),this.max=Math.max(this.max,i),this.data[t*this.width+e]=i},a.prototype.getRow=function(t){return this.data.slice(t*this.width,(t+1)*this.width)},a.prototype.asImageArray=function(){for(var t=new m(new Uint8ClampedArray(this.width*this.height*4),this.width,this.height),e=0;e<this.height;e++)for(var i=0;i<this.width;i++){var a=n.COLOR_MAP.get(this.get(e,i)/this.max);t.set(e,i,a)}return t},a);function a(t,e){this.width=t,this.height=e,this.min=0,this.max=0,this.data=new Uint32Array(t*e)}var m=(r.prototype.get=function(t,e){var i=this.getOffset(t,e);return[this.data[i],this.data[i+1],this.data[i+2]]},r.prototype.getClamped=function(t,e){return this.get(h(t,[0,this.height-1]),h(e,[0,this.width-1]))},r.prototype.set=function(t,e,i){for(var a=this.getOffset(t,e),n=0;n<i.length;n++)this.data[a+n]=i[n];this.data[a+3]=255},r.prototype.colorSeam=function(t){for(var e=0;e<this.height;e++){var i=t[e];this.set(e,i,[255,0,0])}},r.prototype.removeSeam=function(t){for(var e=new r(new Uint8ClampedArray((this.width-1)*this.height*4),this.width-1,this.height),i=0;i<this.height;i++)for(var a=0,n=0;n<this.width;n++)n!=t[i]?e.set(i,n-a,this.get(i,n)):a=1;return e},r.prototype.getImageData=function(){return new ImageData(this.data,this.width,this.height)},r.prototype.getOffset=function(t,e){if(t<0||t>=this.height||e<0||e>=this.width)throw new RangeError("row ("+t+") and col ("+e+") must be in ranges [0, "+this.height+") and [0, "+this.width+"), respectively.");return t*this.width*4+4*e},r);function r(t,e,i){this.data=t,this.width=e,this.height=i}var v=(s.prototype.draw=function(){this.canvasContext.original.putImageData(this.originalImage.getImageData(),0,0),this.canvasContext.modified.fillStyle="lightgrey",this.canvasContext.modified.fillRect(0,0,this.originalImage.width,this.originalImage.height),this.canvasContext.modified.putImageData(this.currentImage.getImageData(),0,0),this.canvasContext.energy.fillStyle="lightgrey",this.canvasContext.energy.fillRect(0,0,this.originalImage.width,this.originalImage.height),this.canvasContext.energy.putImageData(this.energy.asImageArray().getImageData(),0,0),this.canvasContext.energy.fillStyle="rgba(255, 255, 255, 255)";for(var t=0;t<this.currSeamIndices.length;t++){var e=this.currSeamIndices[t];this.canvasContext.energy.fillRect(e,t,1,1)}},s.prototype.reduceWidthByOne=function(){this.currentImage=this.currentImage.removeSeam(this.currSeamIndices),this.canvasContext.naivelyResized.width-=1,this.recompute()},s.prototype.reset=function(){this.currentImage=this.originalImage,this.recompute()},s.prototype.recompute=function(){this.energy=function(t){for(var e=new d(t.width,t.height),i=0;i<t.height;i++)for(var a=0;a<t.width;a++){for(var n=t.getClamped(i,a-1),r=t.getClamped(i,a+1),h=0,o=0;o<n.length;o++)h+=Math.pow(n[o]-r[o],2);var s=t.getClamped(i-1,a),g=t.getClamped(i+1,a),c=0;for(o=0;o<s.length;o++)c+=Math.pow(s[o]-g[o],2);e.set(i,a,Math.sqrt(h+c))}return e}(this.currentImage),this.seamCosts=function(t){for(var e=new d(t.width,t.height),i=new d(t.width,t.height),a=0;a<e.width;a++)e.set(0,a,t.get(0,a)),i.set(0,a,-1);for(var n=1;n<e.height;n++)for(a=0;a<e.width;a++){var r=[e.get(n-1,h(a-1,[0,e.width-1])),e.get(n-1,a),e.get(n-1,h(a+1,[0,e.width-1]))];e.set(n,a,t.get(n,a)+Math.min.apply(Math,r)),i.set(n,a,a+o(r)-(0==a?0:1))}return[e,i]}(this.energy);var t=this.seamCosts[0],e=this.seamCosts[1];this.currSeamIndices=function(t,e){var i=[],a=o(t.getRow(t.height-1));i.push(a);for(var n=e.height-1;0<n;n--)a=e.get(n,a),i.push(a);return i.reverse()}(t,e)},s);function s(t,e){this.originalImage=t,this.canvasContext=e,this.currentImage=t,this.recompute()}var w=new Image;w.src="broadway-tower.jpg",w.onload=function(){var t=document.getElementById("original"),e=t.getContext("2d");e.canvas.height=w.height*(f/w.width),e.canvas.width=f,e.drawImage(w,0,0,e.canvas.width,e.canvas.height);var i=document.getElementById("resized").getContext("2d"),a=w.height*(f/w.width);i.canvas.height=a,i.canvas.width=f;var n=document.getElementById("energy").getContext("2d");n.canvas.height=a,n.canvas.width=f;var r=document.getElementById("naively-resized");r.src=t.toDataURL(),r.height=a,r.width=f;var h=new m(e.getImageData(0,0,e.canvas.width,e.canvas.height).data,e.canvas.width,e.canvas.height),o=new v(h,{original:e,modified:i,energy:n,naivelyResized:r});o.draw();function s(){o.reduceWidthByOne(),o.draw()}var g=document.getElementById("reduce-button"),c=document.getElementById("reset-button");g.innerHTML="Play";var d=-1;g.onclick=function(t){-1==d?(d=window.setInterval(s,100),g.innerHTML="Pause"):u()};var u=function(){clearInterval(d),d=-1,g.innerHTML="Play"};c.onclick=function(t){-1!=d&&u(),o.reset(),o.draw()};var l=document.getElementById("file");l.addEventListener("change",function(t){var e=this.files[0];e.type.match("image.*")||alert("Please upload an image file.");var i=new FileReader;i.onload=function(t){w.src=t.target.result},i.readAsDataURL(e)}),document.getElementById("upload-button").onclick=function(t){-1!=d&&u(),l.click()}}},{"./colormap":1}]},{},[1,2]);