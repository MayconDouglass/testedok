<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => ['api']], function () {
    Route::apiResource('usuarios','api\\UsuarioAPI');
});
