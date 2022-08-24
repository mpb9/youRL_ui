<?php

function search_result(){
  if($_POST['filtUser']){
    return array(
      'id' => 0,
      'poster' => 'no_posts_found', 
      'title' => 'Alter your search!',
      'url' => 'https://www.webfx.com/blog/social-media/social-media-101/',
      'img' => 'https://simkl.net/fanart/66/6681208bf91de020_0.jpg',
      'caption' => 'No need to worry, just adjust your search!',
      'likes' => 0,
      'comments' => 0,
      'viewer' => 'filt users'
    );
  } else {
    return array(
      'id' => 0,
      'poster' => 'no_posts_found', 
      'title' => 'Alter your search!',
      'url' => 'https://www.webfx.com/blog/social-media/social-media-101/',
      'img' => 'https://simkl.net/fanart/66/6681208bf91de020_0.jpg',
      'caption' => 'No need to worry, just adjust your search!',
      'likes' => 0,
      'comments' => 0,
      'viewer' => 'not filt users'
    );
  }
}