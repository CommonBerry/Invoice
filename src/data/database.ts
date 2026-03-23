import { Database } from "bun:sqlite";
import { join } from "node:path";
import { homedir } from "os";
import fs from "fs";
import type { saveProjectInterface } from "../types/projects.ts";

export const prepareDB = (dir: string, path: string) => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const db = new Database(path, { create: true });
    return db
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}


const DB_DIR = join(homedir(), ".local", "share", "invoice", "db");
const DB_PATH = join(DB_DIR, "projects.sqlite");
const db = prepareDB(DB_DIR, DB_PATH)

/**
 * # Initialize tables if they do not exist
 * Map:
 * - number -> REAL
 * - boolean -> INTEGER (0 || 1)
 * */
export const initDB = () => {
  db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            chargeType TEXT NOT NULL,

            clientName TEXT NOT NULL,
            clientEmail TEXT NOT NULL,
            clientCompany TEXT,

            startDate TEXT NOT NULL,
            deliveryForecast TEXT,

            budget REAL NOT NULL,
            contactBudget REAL NOT NULL,
            initialPay REAL,
            expectedPayDate TEXT,

            projectStarted INTEGER DEFAULT 0,
            projectCompleted INTEGER DEFAULT 0,

            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

initDB();

export const saveProject = (project: saveProjectInterface) => {
  const query = db.prepare(`
        INSERT INTO projects (
            name, description, chargeType, clientName, clientEmail,
            clientCompany, startDate, deliveryForecast, budget, contactBudget,
            initialPay, expectedPayDate, projectStarted, projectCompleted
        ) VALUES (
            $name, $description, $chargeType, $clientName, $clientEmail,
            $clientCompany, $startDate, $deliveryForecast, $budget, $contactBudget,
            $isInitialPay, $expectedPayDate, $projectStarted, $projectCompleted
        )
    `);

  query.run({
    $name: project.name,
    $description: project.description,
    $chargeType: project.chargeType,
    $clientName: project.clientName,
    $clientEmail: project.clientEmail,
    $clientCompany: project.clientCompany,
    $startDate: project.startDate,
    $deliveryForecast: project.deliveryForecast,
    $budget: project.budget,
    $contactBudget: project.contactBudget,
    $isInitialPay: project.isInitialPay,
    $expectedPayDate: project.expectedPayDate,
    $projectStarted: project.projectStarted ? 1 : 0,
    $projectCompleted: project.projectCompleted ? 1 : 0,
  });
};

export default db;
