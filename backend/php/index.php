<?php
//include database connection
include "connect.php";
?>

<!--input form data for processing-->
<form action="helloworld.php" method="post">
<label for="">API Name</label>
<input type="text" name="api" required> 
<br><br>
<label for="">API Key</label>
    <input type="password" name="pass" required>
<br><br>
<input type="submit" value="access">
</form>