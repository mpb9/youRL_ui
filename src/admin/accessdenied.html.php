<?php include_once $_SERVER['DOCUMENT_ROOT'] .
    '/podfinder/src/includes/helpers.inc.php'; ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Access Denied</title>
  </head>
  <body>
    <h1>Access Denied</h1>
    <p><?php htmlout($error); ?></p>
    <p><a href="http://localhost:3000/Admin">Return to Admin Home</a></p>
  </body>
</html>