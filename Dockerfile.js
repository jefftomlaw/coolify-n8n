# Dockerfile.js

# 1. Use n8nio/runners as base
FROM n8nio/runners:beta

# 2. Switch to root to install dependencies
USER root

# 3. Install System Dependencies required for 'canvas'
# 'canvas' is a dependency of 'pdf-img-convert' and needs these libraries to build
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

# 4. Install JavaScript Packages
# We delete pnpm-lock.yaml first to avoid "Cannot find resolution" errors
RUN cd /opt/runners/task-runner-javascript \
    && rm -f pnpm-lock.yaml \
    && pnpm add \
    pdf-lib \
    pdf-img-convert \
    pdf-parse

# 5. Fix Permissions
RUN chown -R runner:runner /opt/runners

# 6. Switch back to restricted user
USER runner
