#!/bin/bash

cleanup() {
    # Kill client-react process
    if [ -n "$CLIENT_PID" ]; then
        kill $CLIENT_PID
    fi
    # Kill server-nest process
    if [ -n "$SERVER_PID" ]; then
        kill $SERVER_PID
    fi
    # Run docker-compose down
    pnpm --filter server-nest run stop:dev 
}
    
# Trap SIGINT (Ctrl+C) and EXIT signals
trap cleanup SIGINT

sleep 5

# Start server-nest's dev server 
echo "Starting server-nest development server..."
pnpm --filter server-nest run start:dev &
SERVER_PID=$!

# Start react's dev server
echo "Starting client-react development server..."
pnpm --filter client-react run start:dev &
CLIENT_PID=$!

# Wait for all background processes to finish (or for SIGINT)
wait $SERVER_DOCKER_PID $SERVER_PID $CLIENT_PID