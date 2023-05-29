<template>
    <nav class="p-4 flex justify-between bg-red-50">
        <div><router-link to="/signup">Home</router-link></div>
        <ul class="flex gap-4">
            <li><router-link to="/signup">Signup</router-link></li>
            <li><router-link to="/signin">Signin</router-link></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>