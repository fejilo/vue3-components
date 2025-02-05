<template>
<footer class="footer">
    <slot></slot>
</footer>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue'
export default defineComponent ({
    name:'Bottom',
    props:{}
})
</script>


<style scoped>
.footer{
    position: fixed;
    bottom: 0px;
    display: flex;
    width: 100%;
    z-index: 1;
}
</style>