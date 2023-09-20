const cli = require('next/dist/cli/next-start');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

cli.nextStart();
