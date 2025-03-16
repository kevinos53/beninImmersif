<template>
    <div class="container min-h-screen px-4 py-20 mx-auto text-center md:px-8">
      <div class="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full">
        <i class="text-3xl text-red-500 fas fa-exclamation-triangle"></i>
      </div>
      <h2 class="mb-2 text-2xl font-bold">Événement non trouvé</h2>
      <p class="mb-8 text-gray-600">Nous n'avons pas pu trouver l'événement que vous recherchez.</p>
      <a 
        href="/evenements" 
        class="inline-flex items-center px-6 py-3 text-white transition-all duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600"
      >
        <i class="mr-2 fas fa-arrow-left"></i>
        Retour aux événements
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventNotFound'
  }
  </script>