<?php

define("PATH", "/josh/imgs/");

// PHP4 (to run on dev-next) script to return list of images in the assets folder
$imageDirectory = "imgs/";

// TODO: put in an actual backend thing not PHP4 grossness

$images = array();
$error = "";

if (is_dir($imageDirectory)) {
  if ($dh = opendir($imageDirectory)) {
    while (($file = readdir($dh)) != false) {
      $images[] = $file;
    }

    closedir($dh);
  } else {
    $error = "Failed to open directory" . PHP_EOL;
  }
} else {
  $error = "Not a directory" . PHP_EOL;
}

if ($error != "") {
  // Return a 500 Internal server error message
  echo "{\"status\":500,\"error\": " . $error . "}";
} else {
  // Return JSON array of the list of images
  // JSON encode not until PHP5, yay

  $json = "[";
  $n = sizeof($images);
  for ($i = 0; $i < $n; $i++) {
    if ($images[$i] == "." || $images[$i] == "..") {
      continue;
    }
    $json .= "\"" . PATH . $images[$i] . "\"";

    // Add comma if the last entry in the array
    if ($i < ($n-1)) {
      $json .= ",";
    }
  }
  $json .= "]";
  echo "{\"status\": 200, \"images\": " . $json . "}";
}

?>
