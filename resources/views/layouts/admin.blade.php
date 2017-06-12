<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Styles -->
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body>
    <div id="app">
        <header>
            @if(Auth::check())
                <?php $menuConfig = [
                    'name' => Auth::user()->name,
                    'menus' => [
                        [
                            'name' => 'Candidaturas',
                            'dropdownId' => 'candidaturas'
                        ],
                        [
                            'name' => 'Configuraçao',
                            'dropdownId' => 'configuracao'
                        ]

                    ],
                    'menusDropdown' => [
                        [
                            'id' => 'candidaturas',
                            'items' => [
                                [
                                    'name' => 'M.Integrados',
                                    'url'  => '/candidaturas/m-integrados',
                                ],
                                [
                                    'name' => 'M.Independentes',
                                    'url'  => '/candidaturas/candi-m-independentes',
                                ],
                                [
                                    'name' => 'Doutoramentos',
                                    'url'  => '/candidaturas/candi-doutoramentos',
                                ],
                            ]
                        ],
                        [
                            'id' => 'configuracao',
                            'items' => [
                                [
                                    'name' => 'M.Integrados',
                                    'url'  => '/configuracao/m-integrados',
                                ],
                                [
                                    'name' => 'M.Independentes',
                                    'url'  => '/configuracao/m-independentes',
                                ],
                                [
                                    'name' => 'Doutoramentos',
                                    'url'  => '/configuracao/doutoramentos',
                                ],
                            ]
                        ],

                    ],
                    'urlLogout' => env('URL_ADMIN_LOGOUT'),
                    'csrfToken' => csrf_token(),
                ];
                ?>

                <admin-menu :config="{{ json_encode($menuConfig) }}"></admin-menu>

            @endif
        </header>

        <main>
            @yield('content')
        </main>

        <footer class="page-footer">
            <div class="footer-copyright">
                <div class="container">
                    {{ date('Y')  }}
                </div>
            </div>
        </footer>

    </div>

    <!-- Scripts -->
    <script src="{{asset('build/admin.bundle.js')}}"></script>
</body>
</html>
