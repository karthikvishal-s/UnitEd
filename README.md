
## Getting Started
Follow these instructions to clone the project, create a branch, make changes, and sync your branch with the latest code.

### Prerequisites
- Node.js (v16 or above)
- Git

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

### Creating a New Branch
Before making any changes, create your own branch:
```bash
git checkout -b your-branch-name
```
Example:
```bash
git checkout -b feature/new-feature
```

### Making Changes and Pushing to Your Branch
1. Make your desired changes to the project files.

2. Add the changes to staging:
```bash
git add .
```

3. Commit your changes:
```bash
git commit -m "Your commit message"
```

4. Push your branch to the remote repository:
```bash
git push origin your-branch-name
```

### Pulling Latest Changes from Main Branch
To keep your local branch updated with the latest changes from the **main** branch:
```bash
git checkout main
```
```bash
git pull origin main
```

### Merging Main into Your Branch
After pulling the latest changes, switch back to your branch and merge the **main** branch into it:
```bash
git checkout your-branch-name
```
```bash
git merge main
```

### Resolving Merge Conflicts (if any)
If there are merge conflicts, resolve them manually and then commit the resolved files:
```bash
git add .
git commit -m "Resolved merge conflicts"
```

### Final Push
Once everything is merged and conflicts are resolved, push the changes to your branch:
```bash
git push origin your-branch-name
```

