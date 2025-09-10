/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

// This file ensures Vue macro globals like defineProps/defineEmits/defineExpose
// are recognized by TypeScript in script setup SFCs.

// Vue macros global declarations
declare global {
  const defineProps: any;
  const defineEmits: any;
  const defineExpose: any;
  const withDefaults: any;
}

// Export empty object to make this a module
export {};
