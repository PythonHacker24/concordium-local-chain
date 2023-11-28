use tauri::Window;
use tokio::process::Child;

pub struct AppState {
    pub child_process: Option<Child>,
    pub main_window: Option<Window>,
}

impl AppState {
    pub fn new() -> Self {
        AppState {
            child_process: None,
            main_window: None,
        }
    }
}
