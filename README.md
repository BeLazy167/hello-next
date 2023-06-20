# Created by Vercel CLI
#NOT NEEDED
VERCEL="1"
VERCEL_ENV="development"
VERCEL_URL=""
VERCEL_GIT_PROVIDER=""
VERCEL_GIT_PREVIOUS_SHA=""
VERCEL_GIT_REPO_SLUG=""
VERCEL_GIT_REPO_OWNER=""
VERCEL_GIT_REPO_ID=""
VERCEL_GIT_COMMIT_REF=""
VERCEL_GIT_COMMIT_SHA=""
VERCEL_GIT_COMMIT_MESSAGE=""
VERCEL_GIT_COMMIT_AUTHOR_LOGIN=""
VERCEL_GIT_COMMIT_AUTHOR_NAME=""
VERCEL_GIT_PULL_REQUEST_ID=""

NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN=""
LOGTAIL_SOURCE_TOKEN=""

#NEEDED


# REDIS_URL="REDIS UPSTSASH URL"
# SHADOW_DATABASE_URL="NEON SHADOW DB URL"
# DATABASE_URL="NEON DB URL"
# NEXTAUTH_URL="MAIN DEPLOYMENT URL"
# CI="false"
# JWT_SECRET="REPLACE_JWT_SECRET"
# GOOGLE_CLIENT_SECRET="REPLACE_GOOGLE_CLIENT_SECRET"
# GOOGLE_CLIENT_ID="REPLACE_GOOGLE_CLIENT_ID"



# To set up the various components and environment variables for your app, follow the instructions below:

# 1. NeonDB Setup:
#    - Sign up for a NeonDB account or use an existing one.
#    - Obtain the connection URLs for the NeonDB database and the shadow database.
#    - Update the `DATABASE_URL` and `SHADOW_DATABASE_URL` environment variables in your `.env` file with the respective URLs.

# 2. Upstash Redis Setup:
#    - Sign up for an Upstash account or use an existing one.
#    - Create a Redis instance in Upstash.
#    - Obtain the Redis URL for your Upstash instance.
#    - Update the `REDIS_URL` environment variable in your `.env` file with the Redis URL.

# 3. Logtail Setup:
#    - Sign up for a Logtail account or use an existing one.
#    - Create a Logtail source and obtain the source token.
#    - Update the `NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN` and `LOGTAIL_SOURCE_TOKEN` environment variables in your `.env` file with the source token.

# 4. Google API Credentials Setup:
#    - Create a Google Cloud Platform (GCP) project if you haven't already.
#    - Enable the required APIs for your project (e.g., Google Maps API, Google Calendar API).
#    - Create the necessary credentials (e.g., API key, OAuth client ID) for your project.
#    - Obtain the client ID and client secret for your app.
#    - Update the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables in your `.env` file with the corresponding values.

# 5. NextAuth.js Setup (if applicable):
#    - If you're using NextAuth.js for authentication, make sure you have it properly configured.
#    - Update the `NEXTAUTH_URL` environment variable in your `.env` file with the URL of your app.

# 6. Other Environment Variables:
#    - If you have any other environment variables required by your app, update them in the `.env` file as well.

# 7. Saving the Changes:
#    - Save the changes to the `.env` file.






# Remember to keep the `.env` file private and not share it publicly or commit it to a version control system. It's important to follow security best practices and handle sensitive information securely.

# Once you have set up the environment variables, you can proceed with installing dependencies, initializing Prisma, and starting the application as mentioned in the previous instructions.

# If you encounter any specific issues or need further assistance during the setup process, feel free to ask for help!
