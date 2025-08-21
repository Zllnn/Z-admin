<template>
  <div class="footer">
    <div class="left">Zllnn</div>
    <div class="right">
      <a target="_blank" href="https://github.com/Zllnn/Z-admin">Z-admin</a>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.footer {
  height: 50px;
  border-top: 1px solid $border-light;
  @include flex-between;
  padding: 0 $spacing-lg;
}
</style>