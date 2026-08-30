# Key Learnings – sprint-5-c6d8e0

- **Orchestration**: Adding a `deploy` script that includes `test` and `build` ensures that only "good" code is pushed to the cloud, reducing wasted build minutes and potential deployment failures.
- **Tooling Robustness**: When working with LLM-led automation, the `create` tool is often more reliable than piping `printf` or `cat` for multi-line files.
- **Path Awareness**: Maintaining awareness of the current working directory is critical when executing commands across multiple steps.
