<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
use App\User;

use Auth;
use Hash;

class LoginController extends Controller
{
    public function form()
    {
        if (Auth::user()) {

            $idUser = Auth::user()->id_usuario;
            $uNome = Auth::user()->nome;
            $uNomeSimples = explode(' ', $uNome)[0];
            $aUser = Auth::user()->avatar;

            $countUsers = Usuario::all()->count();

            if (file_exists($aUser)) {
                $avatar = $aUser;
            } else {
                $avatar = 'storage/img/avatars/default.jpg';
            }

                return view('page.index', compact('idUser','uNome','uNomeSimples','avatar','countUsers'));

        } else {

            return view('login');
        }
    }

    public function Login(Request $request)
    {

        $request->validate([
            'email' => 'required',
            'senha' => 'required'
        ]);


        $lembrar = empty($request->remember) ? false : true;

        $usuario = User::where('email', $request->email)
            ->where('status', 1)
            ->first();

        $statusUser = User::where('email', $request->email)
            ->select('status')
            ->first();

        if (!$usuario) {
            return redirect()->action('LoginController@form')->with('status_error', 'Email inválido.');
        }


        if ($usuario && Hash::check($request->senha, $usuario->password)) {

            Auth::loginUsingId($usuario->id_usuario, $lembrar);
        }

        if (!$usuario->status) {
            return redirect()->action('LoginController@form')->with('status_error', 'Usuário Inativo!');
        } else {
            return redirect()->action('LoginController@form')->with('status_error', 'Por favor, verifique os dados!');
        }
    }
}
