import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { Connection } from './connection';
export default Connection.getInstance().db;
