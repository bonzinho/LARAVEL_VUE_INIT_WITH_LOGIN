@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col s8 offset-s2 z-depth-2">
                <h3 class="center">Candidatos Brasil</h3>
                <form method="POST" action="{{ env('URL_ADMIN_LOGIN') }}">
                    {{ csrf_field() }}

                    <div class="row">
                        <div class="input-field col s12">
                            <?php $messageError =  $errors->has('email') ? "data-error='{$errors->first('email')}'" : ''?>
                            <input id="email" type="email" class="validate {{$messageError ? 'invalid' : $messageError}}" name="email" value="{{ old('email') }}" required autofocus>
                            <label for="email" {!! $messageError !!} >E-Mail</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <?php $messageError =  $errors->has('password') ? "data-error='{$errors->first('password')}'" : ''?>
                            <input id="password" type="password" class="validate {{$messageError ? 'invalid' : $messageError}}" name="password" value="{{ old('password') }}" required>
                            <label for="password" {!! $messageError !!} >Password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button type="submit" class="btn">Entrar</button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    </div>
@endsection
