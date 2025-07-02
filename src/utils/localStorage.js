export function loadTasks() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadUsername() {
  return localStorage.getItem("username") || "";
}

export function saveUsername(username) {
  localStorage.setItem("username", username);
}

export function loadDarkMode() {
  return localStorage.getItem("darkMode") === "true";
}

export function saveDarkMode(value) {
  localStorage.setItem("darkMode", value);
}
