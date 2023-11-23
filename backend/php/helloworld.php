<?php
//connect with database
include("connect.php");

//sending form requet to the sever
if (!isset($_POST['submit'])) {
       
    //validating input data
        $api = $_POST['api'];
        $pass = $_POST['pass'];

        //linking with database table
        $q = mysqli_query($conn,"SELECT * from api where api='$api' and pass='$pass'");

        $r = mysqli_fetch_array($q);

      
        //successful data
        if ($r) {
            echo "hello world!";
        }
        //unsuccessful access
        else{
            echo "Api failed";
        }
}
 ?>