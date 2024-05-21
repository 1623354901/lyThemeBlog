<template>
  <div>
    <iframe :src="src" width="100%" height="1000px"></iframe>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
    },
  },
};
</script>
