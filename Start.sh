#!/bin/bash
cd front-end
npm start &
cd ..

# Start server
cd Server_Code
npm start &
cd ..

wait