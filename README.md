# progetti
personal repository containing various projects and experiments in Java, PHP, Python, SQL and other.
## Prerequisites & API Configuration

For security reasons, this repository does not contain any API keys, access tokens, or passwords. The application will not function properly until you provide your own credentials.

### Setup Instructions

1. **Create a `.env` file** in the root directory of the project.
2. **Add your secret keys** inside the file using the following format:
   ```env
   HF_TOKEN=your_actual_huggingface_token_here
   API_KEY=your_other_api_key_here
   ```
3. **Save the file** and launch the application as usual.

*Note: The `.env` file is included in our `.gitignore`, meaning your personal credentials will remain secure on your local machine and will never be pushed to GitHub.*
