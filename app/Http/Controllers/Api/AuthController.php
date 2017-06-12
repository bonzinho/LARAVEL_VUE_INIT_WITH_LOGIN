<?php

namespace Candi\Http\Controllers\Api;

use Candi\Http\Controllers\Controller;
use Candi\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class AuthController extends Controller
{

    use AuthenticatesUsers;

    public function accessToken(Request $request){
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        $credentials = $this->credentials($request);

        if($token = Auth::guard('api')->attempt($credentials)){
            return $this->sendLoginresponse($request, $token);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    public function refreshToken(Request $request){
        $token = Auth::guard('api')->refresh();
        return $this->sendLoginresponse($request, $token);
    }

    /**
     * @param Request $request
     */
    protected function sendLoginResponse(Request $request, $token){
        $this->clearLoginAttempts($request);
        return response()->json([
           'token' => $token,
        ]);
    }

    protected function sendLockoutResponse(Request $request){
        $seconds = $this->limiter()->availableIn(
            $this->throttleKey($request)
        );

        $message = Lang::get('auth.throttle', ['seconds' => $seconds]);

        return response()->json([
           'message' => $message
        ], 403); // 403 forbbiden
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        return response()->json([
            'message' => Lang::get('auth.failed')
        ], 400); //unauthorized
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        Auth::guard('api')->logout();
       return response()->json([], 204); // 204 no content
    }


}
