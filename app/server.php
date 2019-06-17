<?php

$http = new swoole_http_server('0.0.0.0', 9501);

$http->on('start', function($server) {
  echo 'Servidor está sendo executado em http://localhost:9501\n';
});

$http->on('request', function($request, $response) {
  $response->header('Content-type', 'text/plain');
  $response->end('Bem vindo ao CRECI-ES\n');
})

$http->start();