import express from "express";
import jwt from "jsonwebtoken";
import { sha256 } from "js-sha256";
import { Authentication } from "../models/authModel.js";
import { User } from "../models/userModel.js";
import fs from "fs";
import * as AuthDB from "../controllers/db/auth.js";
import * as UserDB from "../controllers/db/user.js";

let secret = process.env.JWT_SALT;
