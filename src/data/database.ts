import { Database } from "bun:sqlite"
import { join } from "node:path"
import type { saveProjectInterface } from "../types/projects.ts";

// Resolver path
const DB_PATH = join(process.cwd(), "data", "database.sqlite");
const db = new Database(DB_PATH, { create: true })

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
            charge_type TEXT,
            
            client_name TEXT,
            client_email TEXT,
            client_company TEXT,
            
            start_date TEXT,
            delivery_forecast TEXT,
            
            budget REAL,
            contact_budget REAL,
            initial_pay REAL,
            expected_pay_date TEXT,
            
            project_started INTEGER DEFAULT 0,
            project_completed INTEGER DEFAULT 0,
            
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `)
}

export const saveProject = (project: saveProjectInterface) => {
    const query = db.prepare(`
        INSERT INTO projects (
            name, description, charge_type, client_name, client_email,
            client_company, start_date, delivery_forecast, budget, contact_budget,
            initial_pay, expected_pay_date, project_started, project_completed
        ) VALUES (
            $name, $description, $chargeType, $clientName, $clientEmail,
            $clientCompany, $startDate, $deliveryForecast, $budget, $contactBudget,
            $isInitialPay, $expectedPayDate, $projectStarted, $projectCompleted
        )
    `)

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
    })
}

export default db
