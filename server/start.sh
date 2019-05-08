#!/bin/sh
echo "MIGRATING"
npm run migrate
echo "SEEDING"
npm run seed-down
npm run seed
npm run start