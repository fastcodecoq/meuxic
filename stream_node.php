<html>

<head>
</head>

<body cz-shortcut-listen="true">

<script src="/audiojs/audio.min.js"></script>

<script>
  audiojs.events.ready(function() {
    var as = audiojs.createAll();
  });
</script>


<audio src="http://meuxic.gomosoft.com:1216/stream/<?php echo $_GET["id"]; ?>"  />





</body>
</html>