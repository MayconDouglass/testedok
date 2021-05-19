<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => ['api']], function () {
    // Route::apiResource('usuarios','api\\UsuarioAPI');
    Route::get('usuarios', 'api\\UsuarioAPI@index');
    Route::get('usuarios/{id}', 'api\\UsuarioAPI@show');
    Route::post('usuarios', 'api\\UsuarioAPI@store');
    Route::post('usuarios/u/{id}', 'api\\UsuarioAPI@update');
    Route::post('usuarios/d/{id}', 'api\\UsuarioAPI@destroy');
    Route::post('usuarios/r/{id}', 'api\\UsuarioAPI@resetPassword');
});
