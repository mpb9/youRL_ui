<?php include_once $_SERVER['DOCUMENT_ROOT'] .
    '/podfinder/src/includes/helpers.inc.php'; ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Manage Users</title>
  </head>
  <body>
    <h1>Manage Users</h1>
    <p><a href="?add">Add new user</a></p>
    <ul>
      <?php foreach ($users as $user): ?>
        <li>
          <form action="" method="post">
            <div>
              <?php htmlout($user['name']); ?>
              <input type="hidden" name="id" value="<?php
                  echo $user['id']; ?>">
              <input type="submit" name="action" value="Edit">
              <input type="submit" name="action" value="Delete">
            </div>
          </form>
        </li>
      <?php endforeach; ?>
    </ul>
    <p><a href="http://localhost:3000/Admin">Return to Admin Home</a></p>
    <?php include '../adminlogout.inc.html.php'; ?>
  </body>
</html>