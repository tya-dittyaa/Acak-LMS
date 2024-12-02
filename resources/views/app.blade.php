<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <link rel="icon" href="{{ asset('favicon.ico') }}">

    <!-- Open Graph -->
    <meta property="og:site_name" content="Acakmaya LMS">
    <meta property="og:title" content="Acakmaya LMS">
    <meta property="og:description" content="Acakmaya LMS is a professional learning management system platform.">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en">
    <meta property="og:url" content="https://acakmaya.dittyaa.my.id">
    <meta property="og:image" content="{{ asset('img/AM.png') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Acakmaya LMS is a professional learning management system platform.">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans bg-background antialiased flex min-h-dvh w-full flex-col">
    @inertia
</body>

</html>
