import { ref, watch } from "vue";

export function useTheme() {
  const isDarkTheme = ref<boolean>(
    JSON.parse(localStorage.getItem("themeState") || "false")
  );

  watch(isDarkTheme, (newValue) => {
    localStorage.setItem("themeState", JSON.stringify(newValue));
  });

  return {
    isDarkTheme,
    toggleTheme() {
      isDarkTheme.value = !isDarkTheme.value;
    },
  };
}
